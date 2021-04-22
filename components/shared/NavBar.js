import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Link from 'next/link';
import withApollo from '@/hoc/withApollo';
import { useLazyGetUser } from '@/apollo/actions'
import { useEffect, useState } from 'react';

const AppLink = ({ children, className, href, as}) => {
  return <Link href={href} as={as}>
      <a className={className}>{children}</a>
    </Link>
};

function NavBar() {
  const [user, setUser ] = useState(null);
  const [ hasResponse, setHasResponse ] = useState(false);
  const [ getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) { setUser(data.user); }
    if (!data.user && user) { setUser(null); }
    if (!hasResponse) { setHasResponse(true); }
  }
  
  return (
    <div>
      {/* NAVBAR START */}
      <div className="navbar-wrapper">
        <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">Abhilash D K</AppLink>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <AppLink className="mr-3 nav-link" href="/portfolio" >
                Potfolio
              </AppLink>
              <AppLink className="mr-3 nav-link" href="/forum/categories">
                Forum
              </AppLink>
              <AppLink className="mr-3 nav-link" href="/cv">
                Cv
              </AppLink>
            </Nav>
            {
              hasResponse && 
              <Nav>
                {
                  user && 
                  <>
                    <span className="nav-link mr-2">Welcome { user.username } </span>
                      { (user.role === 'admin' || user.role === 'instructor') &&
                        <NavDropdown className="mr-2" title="Manage" id="basic-nav-dropdown">
                          <AppLink href="/portfolio/new" className="dropdown-item">
                            Create Portfolio
                          </AppLink>
                          <AppLink href="/instructor/[id]/dashboard" 
                          className="dropdown-item"
                          as={`/instructor/${user._id}/dashboard`}>
                            Dashboard
                          </AppLink>
                        </NavDropdown>
                      }
                    <AppLink className="btn btn-danger nav-link" href="/logout">
                      Sign Out
                    </AppLink>
                  </>
                }
                {
                  (error || !user) &&
                  <>
                    <AppLink className="mr-3 nav-link" href="/login">
                      Sign In
                    </AppLink>
                    <AppLink href="/register" className="nav-link mr-3 btn btn-success bg-green-2 bright">
                      Sign Up
                    </AppLink>
                  </>
                }
                
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
      {/* NAVBAR ENDS */}
    </div>
  )
}

export default withApollo(NavBar);

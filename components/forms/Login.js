import { useForm } from 'react-hook-form';

const LoginForm = (props) => {
  const { register, handleSubmit } = useForm()
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email" 
          name="email"
          {...register("email")} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password" 
          name="password"
          {...register("password")}/>
      </div>
      <button
        type="submit"
        className="btn btn-main bg-blue py-2 ttu">Submit</button>
    </form>
  )
}
  
export default LoginForm;

const mongoose = require('mongoose');
const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const data = {
  users: [
    {
      _id: user1Id,
      avatar: "https://f0.pngfuel.com/png/312/283/man-face-clip-art-png-clip-art-thumbnail.png",
      email: "abhi@gmail.com",
      name: "Abhilash",
      username: "abhilashdk",
      info: "Hello I am Abhilash and I am a developer!",
      password: "abhi2021",
      role: "admin"
    },
    {
      _id: user2Id,
      avatar: "https://f0.pngfuel.com/png/312/283/man-face-clip-art-png-clip-art-thumbnail.png",
      email: "test@gmail.com",
      name: "Test User",
      username: "Test99",
      info: "Hello I am Test and I am a test!",
      password: "testtest"
    }
  ],
  portfolios: [
    {
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016',
      user: user1Id
    },
    {
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
      user: user2Id
    },
    {
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
      user: user1Id
    }
  ],
  forumCategories: [
    {
      _id: "",
      title: 'General Discussion',
      subTitle: 'Open any topic you want',
      slug: 'general-discussion'
    },
    {
      _id: "",
      title: 'Job Requests',
      subTitle: 'Post here job opportunities',
      slug: 'job-requests'
    },
    {
      _id: "",
      title: 'Developer Jokes',
      subTitle: 'Just funny developing stuff',
      slug: 'developer-jokes'
    }
  ],
  topics: [
    {
      _id: "",
      title: 'How to learn JS',
      slug: "how-to-learn-js",
      content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: "",
      user: ""
    },
    {
      title: 'How to learn JAVA',
      slug: "how-to-learn-java",
      content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: "",
      user: ""
    },
    {
      title: 'How to learn C++',
      slug: "how-to-learn-c++",
      content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: "",
      user: ""
    }
  ]
}

module.exports = data;

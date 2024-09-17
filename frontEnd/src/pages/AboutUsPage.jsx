import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-scroll";
const About = () => {
  return (
    <div className='bg-white text-blue-950 py-20' id='about'>
      <div className='container mx-auto px-8 md:px-16 lg:px-24'>
        <h2 className='text-4xl font-bold text-center mb-12'>About Me</h2>
        <div className='flex flex-col md:flex-row items-center md:space-x-12'>
          <img
            src='/coding-.png'
            alt=''
            className='w-72 h-80 rounded object-cover mb-8 md:mb-0'
          />
          <div className='flex-1'>
            <p className='text-lg mb-8'>
              I am a passionate full-stack developer with a focus on building
              modern and responsive web applications. With a strong foundation
              in both frontend and backend technologies, I strive to create
              seamless and efficient user experiences.
            </p>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <label htmlFor='htmlandcss' className='w-4/12'>
                  ReactJs & nextJs
                </label>
                <div className='grow bg-gray-800 rounded-full h-2.5'>
                  <div
                    className='bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full 
                    transform transition-transform duration-300 hover:scale-105 w-12/12'
                  ></div>
                </div>
              </div>

              <div className='flex items-center'>
                <label htmlFor='htmlandcss' className='w-4/12'>
                  TailwindCSS & BootStrap
                </label>
                <div className='grow bg-gray-800 rounded-full h-2.5'>
                  <div
                    className='bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full 
                    transform transition-transform duration-300 hover:scale-105 w-12/12'
                  ></div>
                </div>
              </div>
              <div className='flex items-center'>
                <label htmlFor='htmlandcss' className='w-4/12'>
                  MongoDB & MySQL
                </label>
                <div className='grow bg-gray-800 rounded-full h-2.5'>
                  <div
                    className='bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full 
                    transform transition-transform duration-300 hover:scale-105 w-11/12'
                  ></div>
                </div>
              </div>

              <div className='flex items-center'>
                <label htmlFor='htmlandcss' className='w-4/12'>
                  NodeJs & ExpressJs
                </label>
                <div className='grow bg-gray-800 rounded-full h-2.5'>
                  <div
                    className='bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full 
                    transform transition-transform duration-300 hover:scale-105 w-11/12'
                  ></div>
                </div>
              </div>
              <div className='flex items-center'>
                <label htmlFor='htmlandcss' className='w-4/12'>
                  C & C++ Programming and OOP
                </label>
                <div className='grow bg-gray-800 rounded-full h-2.5'>
                  <div
                    className='bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full 
                    transform transition-transform duration-300 hover:scale-105 w-10/12'
                  ></div>
                </div>
              </div>
              <div className='flex items-center'>
                <label htmlFor='htmlandcss' className='w-4/12'>
                  Familiarity with Linux systems
                </label>
                <div className='grow bg-gray-800 rounded-full h-2.5'>
                  <div
                    className='bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full 
                    transform transition-transform duration-300 hover:scale-105 w-9/12'
                  ></div>
                </div>
              </div>
            </div>
            <div className='mt-12 flex justify-between text-center'>
              <div>
                <h3
                  className='text-2xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-green-400 to-blue-500'
                >
                  3+
                </h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Hero = () => {
  return (
    <div className='bg-gray-50 text-sky-800 text-center py-16'>
      <img
        src='/myimage.jpg'
        alt='Profile'
        className='mx-auto mb-8 w-48 h-48 rounded-full object-cover transform transition-transform duration-300 hover:scale-105'
      />
      <h1 className='text-4xl font-bold'>
        I'm{" "}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
          Hamid HaghPanah
        </span>
        , Full-Stack Developer
      </h1>
      <p className='mt-4 text-lg text-blue-900'>
        I specialize in building modern and responsive web applications.
      </p>
      <div className='mt-8 space-x-4'>
        <Link
          to='contact'
          smooth={true}
          duration={500}
          className='bg-gradient-to-r from-green-400 to-blue-500 text-white transform transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-full cursor-pointer'
        >
          Contact With Me
        </Link>
        <button className='bg-gradient-to-r from-pink-500 to-yellow-500 text-white transform transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-full'>
          <a href='https://drive.google.com/uc?export=download&id=1c7tM_447vnewogOjAR9mGRwYacaMSCP3'>
            Resume
          </a>
        </button>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://gol-foroushi.liara.run/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast("Email sent successfully!");
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div id='contact' className='bg-gray-50 text-blue-950 py-20' id='contact'>
      <div className='container mx-auto px-8 md:px-16 lg:px-24'>
        <h2 className='text-4xl font-bold text-center mb-12'>Contact Me</h2>
        <div className='flex flex-col md:flex-row items-center md:space-x-12'>
          <div className='flex-1'>
            <h3 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4'>
              Let's Talk
            </h3>
            <p>
              I'm open to discussing web development projects or partnership
              opportunities.
            </p>
            <div className='mb-4 mt-8'>
              <FaEnvelope className='inline-block text-green-400 mr-2'></FaEnvelope>
              <a
                href='mailto:hhaghpanah16@gmail.com'
                className='hover:underline'
              >
                hhaghpanah16@gmail.com
              </a>
            </div>
            <div className='mb-4'>
              <FaPhone className='inline-block text-green-400 mr-2'></FaPhone>
              <span>+989933989887</span>
            </div>
            <div className='mb-4'>
              <FaMapMarkedAlt className='inline-block text-green-400 mr-2'></FaMapMarkedAlt>
              <span>Iran, Tehran</span>
            </div>
          </div>
          <div className='flex-1 w-full'>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name' className='block mb-2'>
                  Your Name
                </label>
                <input
                  type='text'
                  name='name'
                  className='w-full p-2 rounded bg-gray-200 border border-gray-600 focus:outline-none focus:border-green-400'
                  placeholder='Enter Your Name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor='email' className='block mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  className='w-full p-2 rounded bg-gray-200 border border-gray-600 focus:outline-none focus:border-green-400'
                  placeholder='Enter Your Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor='message' className='block mb-2'>
                  Message
                </label>
                <textarea
                  name='message'
                  className='w-full p-2 rounded bg-gray-200 border border-gray-600 focus:outline-none focus:border-green-400'
                  rows='5'
                  placeholder='Enter Your Message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className='bg-gradient-to-r from-green-400 to-blue-500 text-white transform transition-transform duration-300 hover:scale-105 px-8 py-2 rounded-full'
                type='submit'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// const projects = [
//   {
//     id: 1,
//     name: "Gol Foroushi",
//     technologies: "MERN Stack",
//     image: employeeMSImage,
//     github: "https://github.com/YouafKhan1",
//   },
//   {
//     id: 2,
//     name: "Blog App",
//     technologies: "MERN Stack",
//     image: bookMSImage,
//     github: "https://github.com/YouafKhan1",
//   },
//   {
//     id: 3,
//     name: "Book MS",
//     technologies: "MERN Stack",
//     image: employeeMSImage,
//     github: "https://github.com/YouafKhan1",
//   },
// ];

// const Projects = () => {
//   return (
//     <div className='bg-black text-white py-20' id='project'>
//       <div className='container mx-auto px-8 md:px-16 lg:px-24'>
//         <h2 className='text-4xl font-bold text-center mb-12'>My Projects</h2>
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className='bg-gray-800 p-6 rounded-lg hover:shadow-lg
//             transform transition-transform duration-300 hover:scale-105'
//             >
//               <img
//                 src=''
//                 alt={project.name}
//                 className='rounded-lg mb-4
//               w-full h-48 object-cover'
//               />
//               <h3 className='text-2xl font-bold mb-2'>{project.name}</h3>
//               <p className='text-gray-400 mb-4'>{project.technologies}</p>
//               <a
//                 href={project.github}
//                 className='inline-block bg-gradient-to-r
//               from-green-400 to-blue-500 text-white px-4 py-2 rounded-full'
//                 target='_blank'
//                 rel='noopener noreferrer'
//               >
//                 GitHub
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default function AboutUs() {
  return (
    <main className='container mx-auto px-4'>
      <Helmet>
        <title>Hamid Haghpanah</title>
      </Helmet>
      <Hero />
      <About />
      <Contact />
    </main>
  );
}

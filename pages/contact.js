import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      title: "Telegram",
      value: "@dextrojan_support",
      icon: "💬"
    },
    {
      title: "Email",
      value: "support@dextrojan.com",
      icon: "📧"
    },
    {
      title: "Response Time",
      value: "Within 24 hours",
      icon: "⏱️"
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us | The Dex Trojan</title>
        <meta name="description" content="Get in touch with The Dex Trojan team for support, partnerships, or general inquiries." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />

      <main className="container py-5">
        <div className="row justify-content-center g-4">
          <div className="col-lg-10">
            <div className="glass-card p-4 p-md-5">
              <div className="text-center mb-5">
                <h1 className="font-display text-4xl mb-3 text-white">Contact Us</h1>
                <p className="text-lg text-white opacity-90 font-body">
                  Have questions? We're here to help!
                </p>
              </div>

              <div className="row g-4 mb-5">
                {contactInfo.map((info, index) => (
                  <div key={index} className="col-md-4">
                    <div className="glass-card p-4 text-center h-100">
                      <div className="text-3xl mb-3 text-white">{info.icon}</div>
                      <h3 className="font-display text-lg mb-2 text-white">{info.title}</h3>
                      <p className="text-white opacity-90 mb-0 font-body">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4">
                <div className="col-lg-8 mx-auto">
                  <div className="glass-card p-4">
                    <h2 className="text-gradient mb-4 font-display text-center">Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label text-white font-body">Name</label>
                        <input
                          type="text"
                          className="form-control glass-input font-body"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white font-body">Email</label>
                        <input
                          type="email"
                          className="form-control glass-input font-body"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white font-body">Subject</label>
                        <input
                          type="text"
                          className="form-control glass-input font-body"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-white font-body">Message</label>
                        <textarea
                          className="form-control glass-input font-body"
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-accent w-100 text-white font-body">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5">
                <Link href="/" className="btn btn-accent text-white font-body">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .glass-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .glass-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-color);
          box-shadow: 0 0 0 2px rgba(0, 245, 160, 0.1);
          color: white;
        }

        .form-label {
          color: white;
          opacity: 0.9;
        }

        .text-gradient {
          background: linear-gradient(135deg, #00F5A0, #FF3366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .font-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
      `}</style>
    </>
  );
} 
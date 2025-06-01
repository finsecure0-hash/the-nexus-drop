import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';

export default function Contact() {
  const [config] = useState({
    name: '$DEX',
    backgroundColor: '#0A0B0E',
    textColor: '#FFFFFF',
    accentColor: '#00F5A0',
    secondaryAccent: '#FF3366',
    tertiaryAccent: '#6C5CE7',
    cardBg: 'rgba(255, 255, 255, 0.02)',
    cardBorder: 'rgba(255, 255, 255, 0.05)',
  });

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
        <title>{config.name} Contact | Get in Touch</title>
        <meta name="description" content={`Contact the ${config.name} team for support, partnerships, or general inquiries.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <style jsx global>{`
        :root {
          --text-xs: 0.75rem;
          --text-sm: 0.875rem;
          --text-base: 1rem;
          --text-lg: 1.125rem;
          --text-xl: 1.25rem;
          --text-2xl: 1.5rem;
          --text-3xl: 1.875rem;
          --text-4xl: 2.25rem;
          --container-padding: 1rem;
          --card-radius: 24px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (min-width: 768px) {
          :root {
            --container-padding: 2rem;
          }
        }
        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: ${config.backgroundColor};
          min-height: 100vh;
          line-height: 1.6;
          letter-spacing: -0.01em;
          color: ${config.textColor};
          overflow-x: hidden;
        }
        
        .container {
          padding-left: var(--container-padding);
          padding-right: var(--container-padding);
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .glass-card {
          background: ${config.cardBg};
          backdrop-filter: blur(20px);
          border-radius: var(--card-radius);
          border: 1px solid ${config.cardBorder};
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            ${config.accentColor},
            transparent
          );
          opacity: 0.5;
        }
        
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
          border-color: ${config.accentColor}40;
        }
        
        .btn-accent {
          background: black;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 16px;
          transition: var(--transition);
          font-size: var(--text-base);
          letter-spacing: 0.02em;
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 200px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .btn-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          color: white;
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .text-gradient {
          font-family: 'Space Grotesk', sans-serif;
          color: ${config.textColor};
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        
        .font-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
        
        .bg-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 50% 50%,
            ${config.accentColor}10 0%,
            transparent 50%
          );
          pointer-events: none;
          z-index: 0;
        }
        
        .bg-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(${config.cardBorder} 1px, transparent 1px),
                          linear-gradient(90deg, ${config.cardBorder} 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.1;
          pointer-events: none;
          z-index: 0;
        }
        
        .contact-item {
          padding: 2rem;
          background: ${config.cardBg};
          border-radius: 16px;
          border: 1px solid ${config.cardBorder};
          transition: var(--transition);
          text-align: center;
          height: 100%;
          min-height: 200px;
        }
        
        .contact-item.email-box {
          min-height: 250px;
          padding: 2.5rem;
          background: ${config.cardBg}CC;
          border-width: 2px;
        }
        
        .contact-item.email-box:hover {
          transform: translateY(-4px);
          border-color: ${config.accentColor};
          background: ${config.cardBg}DD;
        }
        
        .contact-item.email-box .contact-icon {
          font-size: 3rem;
          margin-bottom: 2rem;
        }
        
        .contact-item:hover {
          transform: translateY(-4px);
          border-color: ${config.accentColor}40;
          background: ${config.cardBg}CC;
        }
        
        .contact-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: ${config.accentColor};
          transition: var(--transition);
        }
        
        .contact-item:hover .contact-icon {
          transform: scale(1.1);
        }
        
        .glass-input {
          background: ${config.cardBg};
          border: 1px solid ${config.cardBorder};
          color: ${config.textColor};
          padding: 1rem 1.25rem;
          border-radius: 12px;
          transition: var(--transition);
          width: 100%;
          font-size: var(--text-base);
        }
        
        .glass-input::placeholder {
          color: ${config.textColor}80;
        }
        
        .glass-input:focus {
          background: ${config.cardBg}CC;
          border-color: ${config.accentColor}40;
          box-shadow: 0 0 0 2px ${config.accentColor}20;
          color: ${config.textColor};
          outline: none;
        }
        
        .form-label {
          color: ${config.textColor};
          opacity: 0.9;
          margin-bottom: 0.75rem;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          :root {
            --container-padding: 1rem;
            --card-radius: 16px;
          }
          
          .glass-card {
            border-radius: var(--card-radius);
            padding: 1.25rem !important;
          }
          
          .btn-accent {
            width: 100%;
            padding: 0.875rem 1.5rem;
            min-width: unset;
          }
          
          .contact-item {
            padding: 1.5rem;
            min-height: 180px;
          }

          .contact-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .glass-input {
            padding: 0.875rem 1rem;
            font-size: var(--text-sm);
          }

          .form-label {
            font-size: var(--text-sm);
            margin-bottom: 0.5rem;
          }

          h1.text-gradient {
            font-size: var(--text-2xl);
          }

          h2.text-gradient {
            font-size: var(--text-xl);
          }

          .text-lg {
            font-size: var(--text-base);
          }
        }

        @media (max-width: 480px) {
          :root {
            --container-padding: 0.75rem;
          }

          .glass-card {
            padding: 1rem !important;
          }

          .contact-item {
            padding: 1.25rem;
            min-height: 160px;
          }

          .row {
            margin-left: -0.5rem;
            margin-right: -0.5rem;
          }

          .col-md-4 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }

          .col-lg-8 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }

          .g-4 {
            --bs-gutter-x: 0.5rem;
            --bs-gutter-y: 0.5rem;
          }
        }
      `}</style>

      <div className="bg-gradient" />
      <div className="bg-grid" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="container py-5">
          <div className="row justify-content-center g-4">
            <div className="col-lg-10">
              <div className="glass-card p-4 p-md-5">
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <h1 className="text-white mb-0 font-display">Contact Us</h1>
                </div>

                <div className="text-center mb-5">
                  <p className="text-lg text-white opacity-90 font-body">
                    Have questions? We're here to help!
                  </p>
                  <span className="text-white font-display">The Dex Trojan</span>
                </div>

                <div className="row g-4 mb-5">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="col-12 col-md-4">
                      <div className={`contact-item d-flex flex-column align-items-center justify-content-center ${info.title === "Email" ? "email-box" : ""}`}>
                        <div className="contact-icon mb-3">{info.icon}</div>
                        <h3 className="font-heading text-lg mb-2 text-white">{info.title}</h3>
                        <p className="text-white opacity-90 mb-0 font-body">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row g-4">
                  <div className="col-12 col-lg-8 mx-auto">
                    <div className="glass-card p-4 p-md-5">
                      <h2 className="text-white mb-4 font-display text-center">Send us a Message</h2>
                      <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                        <div>
                          <label className="form-label d-block mb-2">Name</label>
                          <input
                            type="text"
                            className="glass-input"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="form-label d-block mb-2">Email</label>
                          <input
                            type="email"
                            className="glass-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="form-label d-block mb-2">Subject</label>
                          <input
                            type="text"
                            className="glass-input"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Enter subject"
                          />
                        </div>
                        <div>
                          <label className="form-label d-block mb-2">Message</label>
                          <textarea
                            className="glass-input"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Type your message here..."
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-accent w-100 mt-2">
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 
import { useState, FormEvent } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '1cc42ec7-f903-4951-bab6-d7b1178c0114',
          ...formData,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      value: personalInfo.phone,
      href: `https://wa.me/916380274578`,
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: personalInfo.location,
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      href: personalInfo.socialLinks[0].url,
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      href: personalInfo.socialLinks[1].url,
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      href: personalInfo.socialLinks[3].url,
    },
  ];

  return (
    <section
      id="contact"
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-cosmic-black' : 'bg-gray-50'}`}
    >
      {/* Background Glow */}
      <div className={`absolute bottom-0 left-0 w-1/3 h-1/3 bg-cosmic-teal/10 blur-[120px] pointer-events-none ${isDark ? 'block' : 'hidden'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 drop-shadow-sm ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Get In Touch
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Have a project in mind? Let's discuss how we can work together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3
                className={`text-xl font-bold mb-6 ${
                  isDark ? 'text-white drop-shadow-sm' : 'text-gray-900'
                }`}
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent ${
                      item.href
                        ? isDark
                          ? 'hover:bg-white/5 hover:backdrop-blur-sm hover:border-cosmic-teal/30 hover:shadow-[0_0_15px_rgba(0,245,212,0.1)] cursor-pointer'
                          : 'hover:bg-white hover:border-cosmic-teal/30 hover:shadow-md cursor-pointer'
                        : ''
                    }`}
                    onClick={() => item.href && window.open(item.href, '_blank')}
                  >
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isDark
                          ? 'bg-cosmic-teal/10 text-cosmic-teal shadow-[0_0_10px_rgba(0,245,212,0.2)]'
                          : 'bg-cosmic-teal/10 text-cosmic-teal'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className={`text-xl font-bold mb-6 ${
                  isDark ? 'text-white drop-shadow-sm' : 'text-gray-900'
                }`}
              >
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-xl transition-all duration-300 hover:scale-110 border ${
                      isDark
                        ? 'bg-white/5 backdrop-blur-sm border-white/10 text-gray-400 hover:border-cosmic-blue/50 hover:bg-cosmic-blue/10 hover:text-cosmic-blue hover:shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                        : 'bg-white border-transparent shadow-sm text-gray-600 hover:bg-cosmic-blue/5 hover:border-cosmic-blue/20 hover:text-cosmic-blue hover:shadow-md'
                    }`}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className={`relative h-48 rounded-2xl overflow-hidden border ${
                isDark ? 'bg-white/5 border-white/10 shadow-inner' : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  isDark ? 'text-cosmic-purple/60' : 'text-cosmic-purple/30'
                }`}
              >
                <div className="text-center">
                  <MapPin size={32} className={`mx-auto mb-2 ${isDark ? 'text-cosmic-purple/80' : 'text-cosmic-purple/40'}`} />
                  <p className={isDark ? 'text-gray-500' : 'text-gray-500'}>{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl border transition-all duration-300 ${isDark ? 'bg-white/5 backdrop-blur-md border-white/10 hover:border-cosmic-purple/30 hover:shadow-[0_0_25px_rgba(139,92,246,0.1)]' : 'bg-white shadow-lg border-transparent'}`}>
            <h3
              className={`text-xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl transition-all ${
                      isDark
                        ? 'bg-cosmic-black/50 border-white/10 text-white focus:border-cosmic-teal focus:shadow-[0_0_10px_rgba(0,245,212,0.2)]'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-cosmic-teal focus:ring-cosmic-teal/20'
                    } border outline-none focus:ring-1 focus:ring-cosmic-teal/50`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl transition-all ${
                      isDark
                        ? 'bg-cosmic-black/50 border-white/10 text-white focus:border-cosmic-teal focus:shadow-[0_0_10px_rgba(0,245,212,0.2)]'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-cosmic-teal focus:ring-cosmic-teal/20'
                    } border outline-none focus:ring-1 focus:ring-cosmic-teal/50`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl transition-all ${
                    isDark
                      ? 'bg-cosmic-black/50 border-white/10 text-white focus:border-cosmic-teal focus:shadow-[0_0_10px_rgba(0,245,212,0.2)]'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-cosmic-teal focus:ring-cosmic-teal/20'
                  } border outline-none focus:ring-1 focus:ring-cosmic-teal/50`}
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl transition-all resize-none ${
                    isDark
                      ? 'bg-cosmic-black/50 border-white/10 text-white focus:border-cosmic-teal focus:shadow-[0_0_10px_rgba(0,245,212,0.2)]'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-cosmic-teal focus:ring-cosmic-teal/20'
                  } border outline-none focus:ring-1 focus:ring-cosmic-teal/50`}
                  placeholder="Tell me about your project..."
                />
              </div>

              {submitStatus !== 'idle' && (
                <div
                  className={`flex items-center gap-2 p-4 rounded-xl border ${
                    submitStatus === 'success'
                      ? isDark
                        ? 'bg-cosmic-teal/10 text-cosmic-teal border-cosmic-teal/30'
                        : 'bg-cosmic-teal/10 text-cosmic-teal border-cosmic-teal/30'
                      : isDark
                      ? 'bg-red-500/10 text-red-400 border-red-500/30'
                      : 'bg-red-100 text-red-700 border-red-200'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      Message sent successfully!
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} />
                      Failed to send message. Please try again.
                    </>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-[1.02]'
                } ${
                  isDark
                    ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(0,217,255,0.6)]'
                    : 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white shadow-lg hover:shadow-cosmic-purple/30'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { Card, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";
import { staggerContainer, slideUp } from "@/utils/animation";
import ContactFunc from "@/utils/contact";

import githubIcon from "@/assets/github-logo.svg";
import linkedinIcon from "@/assets/linkedin-logo.svg";
import scholarIcon from "@/assets/google-scholar-logo.svg";

const CONTACT_INFO = {
  email: "jaskaransingh.official7@gmail.com",
  location: "Delhi, India",
  links: [
    { 
      name: "GitHub",
      url: "https://github.com/Jaskaran320",
      icon: githubIcon 
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/jaskaran-singh7",
      icon: linkedinIcon,
    },
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=7e2-d74AAAAJ&hl=en",
      icon: scholarIcon,
    },
  ],
};

const SocialIcon = ({ iconSrc, name }) => {
  return <img src={iconSrc} alt={name} width="20" height="20" className="svg-icon"/>;
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useIntersectionObserver(ref, { threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await ContactFunc(formData.name, formData.email, formData.message);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-4">
      <h2 className="section-title py-1">Get in touch with me</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={(isInView || hasAnimated) ? "visible" : "hidden"}
          className="space-y-6"
        >
          <motion.div variants={slideUp}>
            <h3 className="text-xl font-semibold mb-2">Let's Connect</h3>
            <p className="text-muted-foreground">
              I'm always interested in new opportunities, projects and
              collaborations. Feel free to reach out if you have any questions
              or just want to say hello!
            </p>
          </motion.div>

          <motion.div variants={slideUp} className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>{CONTACT_INFO.location}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={slideUp} className="pt-4">
            <p className="text-sm font-medium mb-3">Find me on</p>
            <div className="flex space-x-4">
              {CONTACT_INFO.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  aria-label={link.name}
                >
                  <SocialIcon iconSrc={link.icon} name={link.name} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          animate={(isInView || hasAnimated) ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                {submitStatus === "success" && (
                  <div className="p-3 bg-green-100 text-green-800 rounded-md">
                    Message sent successfully!
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="p-3 bg-red-100 text-red-800 rounded-md">
                    Failed to send message. Please try again.
                  </div>
                )}

                <Button 
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
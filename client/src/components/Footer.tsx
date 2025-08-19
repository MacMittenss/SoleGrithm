export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        "SoleGrithm Pro",
        "SoleGrithm Ultra", 
        "SoleGrithm Essential",
        "Accessories"
      ]
    },
    {
      title: "Support",
      links: [
        "Documentation",
        "Community",
        "Contact Us",
        "Warranty"
      ]
    },
    {
      title: "Company",
      links: [
        "About",
        "Careers",
        "Press",
        "Privacy"
      ]
    }
  ];

  const socialIcons = [
    { name: "Twitter", icon: "🐦" },
    { name: "Facebook", icon: "📘" },
    { name: "Instagram", icon: "📷" },
    { name: "YouTube", icon: "📺" }
  ];

  return (
    <footer className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="gradient-text text-2xl font-bold mb-4" data-text="SoleGrithm">
              SoleGrithm
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing XR display technology for the future.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <button 
                  key={social.name}
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors text-xl"
                  data-testid={`social-${social.name.toLowerCase()}`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-colors"
                      data-testid={`link-${link.toLowerCase().replace(' ', '-')}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 SoleGrithm. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

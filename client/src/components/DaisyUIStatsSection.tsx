import { motion } from "framer-motion";
import { TrendingUp, Users, MessageSquare, Star, Target, Award, Zap, Globe } from "lucide-react";

const statsData = [
  {
    id: 1,
    value: "50K+",
    label: "Sneakers Cataloged",
    description: "Comprehensive database of authentic sneakers",
    icon: Target,
    color: "primary",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    value: "15K+",
    label: "Active Collectors",
    description: "Growing community of sneaker enthusiasts",
    icon: Users,
    color: "secondary",
    gradient: "from-slate-500 to-slate-600"
  },
  {
    id: 3,
    value: "25K+",
    label: "Community Reviews",
    description: "Authentic reviews from verified buyers",
    icon: MessageSquare,
    color: "accent",
    gradient: "from-emerald-500 to-emerald-600"
  },
  {
    id: 4,
    value: "98%",
    label: "Satisfaction Rate",
    description: "Customer happiness with our platform",
    icon: Star,
    color: "warning",
    gradient: "from-amber-500 to-amber-600"
  },
  {
    id: 5,
    value: "$2.5M+",
    label: "Market Volume",
    description: "Total sneaker transactions this month",
    icon: TrendingUp,
    color: "success",
    gradient: "from-green-500 to-green-600"
  },
  {
    id: 6,
    value: "150+",
    label: "Brand Partners",
    description: "Official partnerships with sneaker brands",
    icon: Award,
    color: "info",
    gradient: "from-cyan-500 to-cyan-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export default function DaisyUIStatsSection() {
  return (
    <section 
      className="py-16 sm:py-24"
      data-theme="solegrithm"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 daisy-badge daisy-badge-primary daisy-badge-lg mb-4">
            <Zap size={16} />
            Platform Analytics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Powering the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Sneaker Culture
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-base-content/80 max-w-3xl mx-auto">
            Real-time insights from our thriving sneaker community and marketplace ecosystem
          </p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover="hover"
                className="daisy-card daisy-card-compact bg-base-200/50 backdrop-blur-sm border border-base-300/20 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                data-testid={`stat-card-${stat.id}`}
              >
                <div className="daisy-card-body relative overflow-hidden">
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  {/* Icon */}
                  <div className="daisy-card-actions justify-end mb-2">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-2">
                    <div className="flex items-end gap-2">
                      <span 
                        className="text-3xl sm:text-4xl font-bold text-white"
                        data-testid={`text-value-${stat.id}`}
                      >
                        {stat.value}
                      </span>
                      <div className="daisy-badge daisy-badge-xs daisy-badge-success mb-2">
                        <TrendingUp size={10} />
                      </div>
                    </div>
                    
                    <h3 
                      className="text-lg font-semibold text-base-content group-hover:text-primary transition-colors duration-300"
                      data-testid={`text-label-${stat.id}`}
                    >
                      {stat.label}
                    </h3>
                    
                    <p className="text-sm text-base-content/70 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Progress Bar Animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-base-300/20">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.gradient} origin-left`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: stat.id * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="daisy-btn daisy-btn-primary daisy-btn-lg">
              <Globe size={20} />
              Explore Platform
            </button>
            <button className="daisy-btn daisy-btn-outline daisy-btn-lg">
              View Analytics Dashboard
            </button>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
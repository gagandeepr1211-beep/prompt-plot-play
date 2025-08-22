import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, FileText, Eye, MapPin, PenTool, CreditCard, FileCheck, RotateCw, Shield } from 'lucide-react';

const About = () => {
  const legalSteps = [
    {
      id: 1,
      icon: Shield,
      title: "Hire a lawyer first",
      description: "Always engage a qualified property lawyer before starting any land purchase process.",
      importance: "critical",
      details: "A lawyer will guide you through the entire process and protect you from legal pitfalls."
    },
    {
      id: 2,
      icon: Eye,
      title: "Verify title & seller",
      description: "Thoroughly verify the property title and authenticate the seller's identity.",
      importance: "critical",
      details: "Check seller's ID, verify ownership documents, and ensure they have the right to sell."
    },
    {
      id: 3,
      icon: FileText,
      title: "Get key documents (EC, A-Khata, DC Conversion)",
      description: "Obtain Encumbrance Certificate, A-Khata, and DC Conversion documents.",
      importance: "critical",
      details: "EC shows transaction history, A-Khata confirms property tax records, DC Conversion shows agricultural to non-agricultural conversion."
    },
    {
      id: 4,
      icon: MapPin,
      title: "Check master plan",
      description: "Verify the property's compliance with the local master plan and zoning regulations.",
      importance: "high",
      details: "Ensure the land use matches your intended purpose and complies with development regulations."
    },
    {
      id: 5,
      icon: Eye,
      title: "Do site visit",
      description: "Physically inspect the property and verify boundaries with survey records.",
      importance: "high",
      details: "Check for encroachments, verify measurements, and confirm access roads."
    },
    {
      id: 6,
      icon: PenTool,
      title: "Sign sale agreement",
      description: "Execute a comprehensive sale agreement with all terms and conditions.",
      importance: "critical",
      details: "Include all agreed terms, conditions, and timeline for registration."
    },
    {
      id: 7,
      icon: CreditCard,
      title: "Bank transfer only",
      description: "Make all payments through proper banking channels with complete documentation.",
      importance: "critical",
      details: "Never pay in cash. Use RTGS/NEFT with proper receipts and maintain all transaction records."
    },
    {
      id: 8,
      icon: FileCheck,
      title: "Register sale deed",
      description: "Complete the registration process at the sub-registrar office.",
      importance: "critical",
      details: "Both parties must be present with all required documents and registration fees."
    },
    {
      id: 9,
      icon: RotateCw,
      title: "Apply for mutation",
      description: "Update property records in your name with local authorities.",
      importance: "high",
      details: "This transfers the property ownership in government records and is essential for future transactions."
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Safe Land Buying Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Learn how to safely purchase land in Bangalore with our comprehensive legal checklist. 
            Follow these 9 essential steps to protect your investment and avoid common pitfalls.
          </p>
          
          {/* Warning Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-warning/10 border border-warning rounded-2xl p-6 max-w-3xl mx-auto"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground mb-2">⚠️ Important Notice</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Land fraud is common in Bangalore. Always follow this checklist and never skip steps to save time or money. 
                  When in doubt, consult with multiple legal experts.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Legal Checklist */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {legalSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="shadow-xl border-0 bg-gradient-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Step Number & Icon */}
                    <div className="bg-primary text-primary-foreground p-6 flex items-center justify-center min-w-[120px]">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: index * 0.1 + 0.3,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                          className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-2"
                        >
                          <step.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <div className="text-2xl font-bold">
                          {step.id.toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground">
                          {step.title}
                        </h3>
                        <Badge className={getImportanceColor(step.importance)}>
                          {step.importance === 'critical' ? '🔴 Critical' : '🟡 Important'}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="font-medium text-foreground">Pro Tip:</span> {step.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <Card className="shadow-xl border-0 bg-gradient-primary text-white max-w-4xl mx-auto">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold">Ready to Buy Land Safely?</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
                Browse our verified properties where all legal checks have been completed by our expert team. 
                Every property comes with complete documentation and legal clearance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 shadow-xl px-8 py-6 text-lg font-semibold"
                  >
                    Browse Verified Properties
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-primary shadow-xl px-8 py-6 text-lg font-semibold"
                  >
                    Consult Legal Expert
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { 
              title: "Document Templates", 
              description: "Download sample agreements and checklists",
              icon: FileText,
              color: "text-primary"
            },
            { 
              title: "Legal Contacts", 
              description: "Verified property lawyers in Bangalore",
              icon: Shield,
              color: "text-success"
            },
            { 
              title: "Government Links", 
              description: "Official portals for document verification",
              icon: CheckCircle,
              color: "text-warning"
            }
          ].map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="shadow-lg border-0 bg-gradient-card h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-12 h-12 ${resource.color} mx-auto mb-3`}>
                    <resource.icon className="h-12 w-12" />
                  </div>
                  <h3 className="font-semibold text-foreground">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
                  <Button variant="outline" size="sm" className="hover:bg-accent">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
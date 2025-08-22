import { motion } from 'framer-motion';
import { AddPropertyForm } from '@/components/AddPropertyForm';
import { useProperties } from '@/hooks/useProperties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Shield, Clock, CheckCircle } from 'lucide-react';

const UploadProperty = () => {
  const { addProperty } = useProperties();

  const benefits = [
    {
      icon: Shield,
      title: "Verified Listing",
      description: "All properties go through our verification process",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Quick Approval",
      description: "Get approved within 2-3 business days",
      color: "text-warning"
    },
    {
      icon: CheckCircle,
      title: "Legal Support",
      description: "Access to legal experts for documentation",
      color: "text-primary"
    }
  ];

  const steps = [
    "Fill out the property details form",
    "Upload property photos and documents",
    "Our team verifies the information",
    "Your property goes live on the marketplace",
    "Connect with potential buyers"
  ];

  return (
    <div className="min-h-screen bg-gradient-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Sell Your Property
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            List your land on our verified marketplace and connect with serious buyers. 
            Get the best value for your property with our transparent process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AddPropertyForm onAddProperty={addProperty} />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Benefits */}
            <Card className="shadow-xl border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Why Choose LandVest?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className={`p-2 rounded-lg bg-muted/50`}>
                      <benefit.icon className={`h-4 w-4 ${benefit.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card className="shadow-xl border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="shadow-xl border-0 bg-gradient-card">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Marketplace Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Properties Listed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="shadow-xl border-0 bg-gradient-primary text-white">
              <CardContent className="p-6 text-center space-y-3">
                <h4 className="font-semibold">Need Help?</h4>
                <p className="text-sm opacity-90">
                  Our property experts are here to assist you with the listing process.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-primary font-semibold py-2 px-4 rounded-lg hover:bg-white/90 transition-colors"
                >
                  Contact Support
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UploadProperty;
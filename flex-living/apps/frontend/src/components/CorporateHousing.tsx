import { Search, Heart, Infinity } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Search",
    description: "Find your perfect stay with our intuitive search",
  },
  {
    icon: Heart,
    title: "Quality Assured",
    description: "All properties are verified and quality checked",
  },
  {
    icon: Infinity,
    title: "Flexible Terms",
    description: "From short stays to long-term rentals",
  },
];

const CorporateHousing = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Corporate Housing
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The Flex partners with over 150 companies worldwide to deliver corporate housing solutions for staffing, employee relocation, and temporary accommodations for insurance claims. Our flexible, fully furnished rentals are ideal for businesses and insurers seeking reliable, move-in ready stays across global locations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-2 text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorporateHousing;

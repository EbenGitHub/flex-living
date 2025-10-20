const discounts = [
  { duration: "1 Week", percentage: "10%" },
  { duration: "2 Weeks", percentage: "15%" },
  { duration: "1 Month", percentage: "20%" },
  { duration: "3 Months", percentage: "29%" },
  { duration: "6 Months", percentage: "30%" },
  { duration: "1 Year", percentage: "38%" },
];

const DiscountCards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stay Longer, Save More
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The longer you stay, the more you save – great news for those looking for hassle free long term rentals, extended business trips or relocations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {discounts.map((discount, index) => (
            <div
              key={discount.duration}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hero transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {discount.duration}
                </p>
                <p className="text-4xl font-bold text-foreground mb-1">
                  {discount.percentage}
                </p>
                <p className="text-xs text-muted-foreground">discount</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountCards;

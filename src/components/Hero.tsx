interface CategoryCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

function CategoryCard({ title, image, onClick }: CategoryCardProps) {
  return (
    <div
      className="relative aspect-square cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover brightness-[0.85]"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-wider font-light text-center px-4">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function Hero() {
  const dispatchNavigate = (category: string) => {
    const event = new CustomEvent("navigate", {
      detail: "products",
      bubbles: true,
    });
    window.dispatchEvent(event);
    setTimeout(() => {
      const categoryEvent = new CustomEvent("setCategory", {
        detail: category,
        bubbles: true,
      });
      window.dispatchEvent(categoryEvent);
    }, 0);
  };

  const categories = [
    {
      title: "FEAR OF GOD",
      image:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&q=80",
    },
    {
      title: "ATHLETICS",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80",
    },
    {
      title: "ESSENTIALS",
      image:
        "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div>
      <div className="relative h-screen">
        <img
          src="https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80"
          alt="Hero"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-wider mb-4 sm:mb-6 md:mb-8 text-center">
            ETERNAL
          </h1>
          <button
            onClick={() => dispatchNavigate("All")}
            className="bg-white/90 hover:bg-white text-black px-6 sm:px-8 py-2 text-xs sm:text-sm tracking-[0.2em] transition-colors"
          >
            SHOP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 mx-2 md:gap-5 md:mx-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
            onClick={() => dispatchNavigate(category.title)}
          />
        ))}
      </div>
    </div>
  );
}

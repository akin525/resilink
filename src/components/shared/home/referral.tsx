import Heading from "./headingTitle";

const ExclusiveBenefits = () => {
  const handleShare = () => {
    const currentUrl = window.location.href;
    const message =
        "Looking for a vacant house to rent for your next home? Check out ResiLink, a platform that seamlessly connects you with available homes. Visit: ";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        message + currentUrl
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
      <section className="md:px-10 px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Client Benefits Section */}
          <Heading heading="Client Benefits" subheading="Benefits for Our Clients" />
          <div className="text-center text-gray-600 py-6">
            <p className="text-lg font-medium mb-4">
              Enjoy complimentary cleaning services after completing your property rental on ResiLink to ensure a stress-free move.
            </p>
            <p className="text-lg font-medium">
              It’s our way of saying thank you for trusting ResiLink with your dream home.
            </p>
          </div>

          {/* Earning Steps Section */}
          <Heading heading="Earn with ResiLink" subheading="Earn quick cash in just 4 easy steps!" />
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {["Locate apartment", "Take pictures", "Send pictures", "Get paid"].map((title, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
                  <div className="h-12 w-12 flex items-center justify-center bg-bc text-white rounded-md">📌</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <p className="text-gray-600 mt-2">
                      {i === 0 && "Locate an available apartment for rent, such as one from a friend who's moving out."}
                      {i === 1 && "Take clear photos of the vacant apartment."}
                      {i === 2 && "Send the pictures to ResiLink’s Customer Service."}
                      {i === 3 && "Receive payment after the successful rental of the apartment."}
                    </p>
                  </div>
                </div>
            ))}
          </div>

          {/* Referral Program Section */}
          <Heading subheading="Start Earning Now!" />
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Refer and Earn",
                desc: "Invite your friends to use ResiLink! Earn rewards for every successful rental through your referral link.",
                action: (
                    <button
                        onClick={handleShare}
                        className="w-full bg-bc text-white py-3 px-6 rounded-full font-medium text-lg hover:bg-bc-dark transition"
                    >
                      Refer Now
                    </button>
                ),
              },
              {
                title: "List Properties and Earn",
                desc: "Upload vacant properties and earn a percentage of the rent each time your property is rented.",
                action: (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://wa.link/sfzgvg"
                        className="w-full text-center block bg-bc text-white py-3 px-6 rounded-full font-medium text-lg hover:bg-bc-dark transition"
                    >
                      Post a Property
                    </a>
                ),
              },
            ].map((card, i) => (
                <div key={i} className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.desc}</p>
                  {card.action}
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default ExclusiveBenefits;

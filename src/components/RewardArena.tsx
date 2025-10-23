import { Card } from "@/components/ui/card";
import prizeTrophy from "@/assets/prize-trophy.jpg";
import grandPrizeImg from "@/assets/grandPrize.jpg";
import secondPrizeImg from "@/assets/secondPrize.jpg";
import thirdPrizeImg from "@/assets/thirdPrize.jpg";
import multiplePrizeImg from "@/assets/multiplePrize.jpg";

const prizes = [
  { rank: "1st", image: grandPrizeImg, medal: "🥇" },
  { rank: "2nd", image: secondPrizeImg, medal: "🥈" },
  { rank: "3rd", image: thirdPrizeImg, medal: "🥉" },
  { rank: "—", image: multiplePrizeImg, medal: "🎁" }, // optional medal for other prizes
];

const RewardArena = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins">Reward Arena</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Win incredible prizes while supporting Ethiopia's sports future
          </p>
        </div>

        {/* Rotating Cards */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-scroll-cards">
            {prizes.concat(prizes).map((prize, index) => (
              <Card
                key={index}
                className="w-72 h-80 mx-2 flex-shrink-0 border-2 shadow-md hover:shadow-lg transition"
              >
                {/* Image - 80% of card */}
                <div className="h-[80%]">
                  <img
                    src={prize.image}
                    alt={prize.rank}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                {/* Rank + Medal - 20% */}
                <div className="h-[20%] flex items-center justify-center">
                  <p className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="text-2xl">{prize.medal}</span> {prize.rank} Prize
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Static Trophy Below */}
        <div className="flex justify-center mt-12">
          <img
            src={prizeTrophy}
            alt="Championship Trophy"
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default RewardArena;

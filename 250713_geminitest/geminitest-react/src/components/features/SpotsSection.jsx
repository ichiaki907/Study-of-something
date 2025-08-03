import React from "react";
import SectionHeader from "../ui/SectionHeader";

const SpotsSection = () => {
  const spots = [
    {
      id: 1,
      name: "渋谷スクランブル交差点",
      description:
        "世界で最も忙しい交差点の一つとして知られる渋谷のシンボル。巨大なビジョンボードと人々の行き交いが印象的な、東京の現代的な魅力を体感できる場所です。",
      address: "東京都渋谷区渋谷2-21-1",
      image: "/logo192.png",
    },
    {
      id: 2,
      name: "新宿御苑",
      description:
        "東京の中心部にある広大な公園。四季折々の花々が楽しめ、特に桜の季節は美しい景色で人気です。都会の喧騒から離れて、ゆっくりと時間を過ごすのに最適な場所です。",
      address: "東京都新宿区内藤町11",
      image: "/logo192.png",
    },
    {
      id: 3,
      name: "中野ブロードウェイ",
      description:
        "アニメやゲーム、フィギュアなどのサブカルチャーの聖地。古い商店街の雰囲気を残しながら、新しいカルチャーが融合した独特な空間です。",
      address: "東京都中野区中野5-52-15",
      image: "/logo192.png",
    },
    {
      id: 4,
      name: "品川シーサイド",
      description:
        "東京湾を望む美しい海辺のエリア。夕日が特に美しく、カップルや家族連れに人気のデートスポットです。海の風を感じながら、ゆったりとした時間を過ごせます。",
      address: "東京都品川区東品川4-12-8",
      image: "/logo192.png",
    },
    {
      id: 5,
      name: "目黒区美術館",
      description:
        "地域に根ざした美術館で、様々な展覧会が開催されています。知的好奇心を満たすことができる文化的な施設が集まるエリアです。",
      address: "東京都目黒区目黒2-4-36",
      image: "/logo192.png",
    },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader title="スポット情報">
        <div className="space-y-4">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {spot.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {spot.description}
                  </p>
                  <p className="text-xs text-gray-500">{spot.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionHeader>
    </div>
  );
};

export default SpotsSection;

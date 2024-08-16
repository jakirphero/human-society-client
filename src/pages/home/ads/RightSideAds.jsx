
const RightSideAds = () => {
    const cards = [
        { image: 'https://i.ibb.co/7V40t5p/images.jpg', title: 'Card 1 Title' },
        { image: 'https://i.ibb.co/XpPd1TM/download-1.jpg', title: 'Card 2 Title' },
        { image: 'https://i.ibb.co/Qjzft8m/images.jpg', title: 'Card 3 Title' },
        { image: 'https://i.ibb.co/6mNp7MW/The-Great-Wall-of-China-at-Jinshanling-edit.jpg', title: 'Card 4 Title' },
    ];
    return (
        <div className="w-full space-y-4">
            {cards.map((card, index) => (
                <div key={index} className="card card-compact bg-base-100 shadow-xl mb-4">
                    <figure>
                        <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{card.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RightSideAds;
import React from 'react';
import NoImg from "../../assets/boy.png";

const Cast = ({ cast, createdBy }) => {
   
    // Ensure cast is defined and filter members with profile images, limiting to 13
    const castWithImages = (cast && Array.isArray(cast) ? cast.filter(member => member.profile_path) : []).slice(0, 13);

    // Ensure createdBy is defined and filter creators with profile images, limiting to 13
    const creatorsWithImages = (createdBy && Array.isArray(createdBy) ? createdBy.filter(creator => creator.profile_path) : []).slice(0, 13);

    // Default message when no cast members or creators are available
    if (castWithImages.length === 0) {
        castWithImages.push({
            id: 0,
            name: "No cast information available",
            profile_path: NoImg,
        });
    }

    return (
        <div className="w-full mx-auto mt-10">
            <h2 className="text-3xl font-bold text-white mb-9 ml-9">Cast</h2>
            <div className="flex flex-wrap lg:gap-5 gap-3 lg:justify-center">
                {castWithImages.map((member) => (
                    <div key={member.id} className="w-[30%] sm:w-[50%] md:w-[30%] lg:w-[20%] xl:w-[15%] flex flex-col items-center space-y-5">
                        <div className="w-[100px] h-[100px] rounded-full overflow-hidden shadow-lg">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={member.profile_path === NoImg ? NoImg : `https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                alt={member.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = NoImg;
                                }}
                            />
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className="text-white font-semibold mt-2 text-center">{member.name}</p>
                            {member.character && <p className="text-white mt-1 w-full text-sm opacity-75 text-center">{member.character.slice(0, 20)}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {creatorsWithImages.length > 0 && (
                <>
                    <h2 className="text-3xl font-bold text-white mb-9 mt-12 ml-9">Creators</h2>
                    <div className="flex flex-wrap lg:gap-5 gap-3 lg:justify-center">
                        {creatorsWithImages.map((creator) => (
                            <div key={creator.id} className="w-[30%] sm:w-[50%] md:w-[30%] lg:w-[20%] xl:w-[15%] flex flex-col items-center space-y-5">
                                <div className="w-[100px] h-[100px] rounded-full overflow-hidden shadow-lg">
                                    <img
                                        className="w-full h-full object-cover object-center"
                                        src={creator.profile_path === NoImg ? NoImg : `https://image.tmdb.org/t/p/w500${creator.profile_path}`}
                                        alt={creator.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = NoImg;
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className="text-white font-semibold mt-2 text-center">{creator.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cast;

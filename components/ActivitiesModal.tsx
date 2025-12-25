import React, { useEffect } from 'react';
import { X, Calendar, MapPin, Users } from 'lucide-react';

interface Activity {
    id: number;
    title: string;
    category: string;
    date: string;
    location: string;
    participants: string;
    image: string;
    description: string;
}

interface ActivitiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ActivitiesModal: React.FC<ActivitiesModalProps> = ({ isOpen, onClose }) => {
    const activities: Activity[] = [
        {
            id: 1,
            title: 'Brawijaya Esport Cup 2023',
            category: 'Tournament',
            date: '20-22 Dec 2023',
            location: 'Samantha Krida Hall',
            participants: '64 Teams',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2ms5jJWkhWyETyukpT3AcwTat-MD6eaMDzX29JbuT4Czab8OR47cdPkuVHLBzrH1uizgJaHF9H2GpU5vccg8HBdnbCYo_pPntI21zGMMwotMnr75781KnBA8tQ81p_3lVz4aWqPSMwUcAK0NLZC9WPa9R27-yGwCRHVqICaZsStZpP3RLInWGfEK--kKVcGByUYJcxdxD-Gk0nmLLpowob6mACdhOKXlk9Cj6-SMv3GtO2RRBV2k8p4G1N_JsqMCVpN1z9OcUpXA',
            description: 'Turnamen terbesar antar fakultas se-Universitas Brawijaya dengan total hadiah 15 juta rupiah.'
        },
        {
            id: 2,
            title: 'Community Meetup',
            category: 'Gathering',
            date: '15 Nov 2023',
            location: 'UB Convention Hall',
            participants: '200+ Members',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpP42CUAjM3Eo3lPSFgCYJazhUl8mJ2AV9YqE-naqY0opx_xIgvn7PMelmz_xGWgtoNJlpDK5USObod50-xh9VekUE4AnraijWMUNEWtG3ODQptIZMVhNWgs8dKI_i2xhxFge3leksisNcH0OWbSZmhMMvsYKlVs5gnO79aEUJ-aoFsxKuPCEwDYri9VYyKqH7lbhIT8MkCQs4b68nG_v6Bs6VNl-zTvND9lixiBdbji2-MQ7HdzzbMrL9R0yZif_9ZZF3RBWMNaM',
            description: 'Acara pertemuan seluruh anggota Brawijaya Esport untuk mempererat hubungan komunitas.'
        },
        {
            id: 3,
            title: 'Pro Player Bootcamp',
            category: 'Training',
            date: '1-7 Oct 2023',
            location: 'Gaming House',
            participants: '25 Athletes',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc3nM6cUOzmtGUCa7UvtauKr6xJIkOcaSFP14DuRF5w7-kflEyzcn8mAhxomvrd0WAbLkezWYKvWZOIdMxrsEXLytnQnX9eK1pzOOW4XimNeRdZKyugDjdIgpVXwaLJWwIahxQ3vF8f7rZQWlNFgUtkMJJnsFLUJZbzQ3stCcREmAYpd5OdkUFWzhZ7izO6RIQbfiolsZTtMtsvVWG4EZZTrJw_ZEinSbCVHUD3ArNoSb_YRsoUuRpNbL42DX_ptd2e6IROqFaMPg',
            description: 'Pelatihan intensif untuk atlet esport dengan coach profesional.'
        },
        {
            id: 4,
            title: 'Casting Workshop',
            category: 'Workshop',
            date: '25 Sep 2023',
            location: 'Studio BEST',
            participants: '30 Participants',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPL6mMFosdJGeatv4RsgeCL15JXhMoVetacO-OrStWk4IibOyAQ0JTq3YqofEQmjBTBMGOpx9sqJZCW0E6qZtAcGTUD-Z3_UJYNP-VB4WPsPu0ULSTlnUk2_DGoIQ4A1sS_LgRw8mk3geqo7HhFEbqJFC5TmZ6fGb0DFZKmvDnCxbqH4qu58j26B3FpvjWSGKB4bwBHk2oMiH58AiHW0nAczqlw9ctwusPGBUoa-G7XN5UH8PaBoOjZ4376mO126cLC-xOosrSasA',
            description: 'Workshop untuk menjadi shoutcaster profesional dengan mentor berpengalaman.'
        },
        {
            id: 5,
            title: 'MLBB Weekly Scrim',
            category: 'Scrimmage',
            date: 'Every Saturday',
            location: 'Discord Server',
            participants: '10 Teams',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkher210UrjhjZMK7VcQf_gF9UBa3_fS569KrV8PLzXFpmXw_8cAifAnaraY8CmjYjd4PIyRokuLMtpXD0VgbGSNv2hVRQbv1tXKhEHqVjituhxISyyVd6WeV8xzXSJgEl4F-W9zKUeFQFGXTf7Tlkfdoh8LtI-lVAdTil5tu2B50mrMZuEwmEdQixT4sroBOSHvXTMdHJRK3Ruh-U8-km7nh3Zwb2O_K4z2py7iHxdh5lHZK3QUvV91CuvFsRX_iFl96ffABU718',
            description: 'Latihan tanding rutin setiap akhir pekan untuk divisi Mobile Legends.'
        },
        {
            id: 6,
            title: 'Valorant Championship',
            category: 'Tournament',
            date: '10-12 Nov 2023',
            location: 'Esports Arena',
            participants: '32 Teams',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2ms5jJWkhWyETyukpT3AcwTat-MD6eaMDzX29JbuT4Czab8OR47cdPkuVHLBzrH1uizgJaHF9H2GpU5vccg8HBdnbCYo_pPntI21zGMMwotMnr75781KnBA8tQ81p_3lVz4aWqPSMwUcAK0NLZC9WPa9R27-yGwCRHVqICaZsStZpP3RLInWGfEK--kKVcGByUYJcxdxD-Gk0nmLLpowob6mACdhOKXlk9Cj6-SMv3GtO2RRBV2k8p4G1N_JsqMCVpN1z9OcUpXA',
            description: 'Kejuaraan Valorant tingkat regional dengan prize pool besar.'
        }
    ];

    // Hide navbar when modal opens
    useEffect(() => {
        const navbar = document.querySelector('nav');
        if (navbar) {
            if (isOpen) {
                navbar.style.transform = 'translateX(-50%) translateY(-150%)';
                navbar.style.opacity = '0';
                document.body.style.overflow = 'hidden';
            } else {
                navbar.style.transform = 'translateX(-50%) translateY(0)';
                navbar.style.opacity = '1';
                document.body.style.overflow = '';
            }
        }
        return () => {
            if (navbar) {
                navbar.style.transform = 'translateX(-50%) translateY(0)';
                navbar.style.opacity = '1';
            }
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop with animation */}
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-md animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal with slide up animation */}
            <div className="relative w-full max-w-6xl max-h-[90vh] bg-black border border-primary/20 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(255,215,0,0.15)] animate-slideUp">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-black border-b border-white/10 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-white">Semua Aktivitas</h2>
                        <p className="text-gray-400 text-sm">{activities.length} kegiatan tercatat</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-primary transition-all duration-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)] animate-fadeInUp"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={activity.image}
                                        alt={activity.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-gradient-to-r from-primary to-yellow-400 text-black text-xs font-bold uppercase">
                                        {activity.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        {activity.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{activity.description}</p>

                                    {/* Meta */}
                                    <div className="space-y-2 text-xs text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-primary" />
                                            <span>{activity.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            <span>{activity.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-3.5 h-3.5 text-primary" />
                                            <span>{activity.participants}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivitiesModal;

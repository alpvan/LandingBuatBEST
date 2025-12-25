import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Reveal from './Reveal';
import MemberCard from './MemberCard';
import TextScramble from './TextScramble';

// Helper to generate staff data
const generateStaff = (division: string, count: number, startIdx = 1) => {
    return Array.from({ length: count }, (_, i) => ({
        name: `${division} Member ${startIdx + i}`,
        role: `${division} STAFF`,
        division: division,
        color: "from-blue-500 to-cyan-500" // Default color
    }));
};

// Data Definition
const ORGANIZATION_DATA: Record<string, { name: string; role: string; division: string; color: string }[]> = {
    BPI: [
        { name: "Abiyasa Satria Lintang Perkasa", role: "KETUA UMUM", division: "BPI", color: "from-yellow-400 to-orange-500" },
        { name: "Muhammad Alvan Javierul Haq", role: "SEKRETARIS 1", division: "BPI", color: "from-yellow-400 to-orange-500" },
        { name: "ismail hamzah manaf", role: "SEKRETARIS 2", division: "BPI", color: "from-yellow-400 to-orange-500" },
        { name: "Nerisa Dewi Arvianti", role: "BENDAHARA", division: "BPI", color: "from-yellow-400 to-orange-500" },
        { name: "Fanti Dwi Amawati", role: "WAKIL KETUA 1", division: "Community", color: "from-purple-500 to-pink-500" },
        { name: "Imelda Ikhfi Rahmadanti", role: "WAKIL KETUA 2", division: "Internal", color: "from-orange-500 to-red-500" },
        { name: "Muhammad Ronaa Setyoni Putra", role: "WAKIL KETUA 3", division: "Talent", color: "from-cyan-500 to-blue-600" },
        { name: "Rananda Ardiawan", role: "COMMUNITY DIRECTOR", division: "Community", color: "from-purple-400 to-pink-400" },
        { name: "Ki Bagus Kusuma Adjinegara", role: "INTERNAL DIRECTOR", division: "Internal", color: "from-orange-400 to-red-400" },
    ],
    HRD: [
        { name: "Muhammad Hilmii Saliim", role: "HRD STAFF", division: "HRD", color: "from-orange-400 to-red-400" },
        { name: "Danish Abdurochman", role: "HRD STAFF", division: "HRD", color: "from-orange-400 to-red-400" },
        { name: "Muhammad Putra Abhinaya", role: "HRD STAFF", division: "HRD", color: "from-orange-400 to-red-400" },
        { name: "Azzahra Shafa As'adiyati", role: "HRD STAFF", division: "HRD", color: "from-orange-400 to-red-400" },
    ],
    MLBB: [
        { name: "Adib Insanul Godi", role: "MLBB STAFF", division: "MLBB", color: "from-purple-400 to-pink-400" },
        { name: "Bimo Abi Umardhani", role: "MLBB STAFF", division: "MLBB", color: "from-purple-400 to-pink-400" },
        { name: "Nabil Syabdwi Putra", role: "MLBB STAFF", division: "MLBB", color: "from-purple-400 to-pink-400" },
        { name: "Javier Narayana", role: "MLBB STAFF", division: "MLBB", color: "from-purple-400 to-pink-400" },
        { name: "MOH. RIFQI PRADITYA", role: "MLBB STAFF", division: "MLBB", color: "from-purple-400 to-pink-400" },
    ],
    PUBGM: [
        { name: "Muhammad Rizky Andika Pratama", role: "PUBGM STAFF", division: "PUBGM", color: "from-emerald-400 to-teal-500" },
    ],
    COMMUNITY: [
        { name: "Haidar Ali", role: "COMMUNITY STAFF", division: "COMMUNITY", color: "from-indigo-400 to-blue-500" },
        { name: "Satria Dwi Saputra", role: "COMMUNITY STAFF", division: "COMMUNITY", color: "from-indigo-400 to-blue-500" },
        { name: "Radite Arsa Manggala", role: "COMMUNITY STAFF", division: "COMMUNITY", color: "from-indigo-400 to-blue-500" },
        { name: "Satriyo Wibowo", role: "COMMUNITY STAFF", division: "COMMUNITY", color: "from-indigo-400 to-blue-500" },
        { name: "Fawwazi Fathur Rahman", role: "COMMUNITY STAFF", division: "COMMUNITY", color: "from-indigo-400 to-blue-500" },
    ],
    CREATIVE: [
        { name: "M. Nabil Rabbani", role: "CREATIVE STAFF", division: "CREATIVE", color: "from-pink-400 to-rose-500" },
        { name: "I Dewa Gede Agastya Darma", role: "CREATIVE STAFF", division: "CREATIVE", color: "from-pink-400 to-rose-500" },
        { name: "Radinka Janu Mahardika", role: "CREATIVE STAFF", division: "CREATIVE", color: "from-pink-400 to-rose-500" },
        { name: "Syabina Ramadani Salsabila", role: "CREATIVE STAFF", division: "CREATIVE", color: "from-pink-400 to-rose-500" },
        { name: "Adinda Putri Maharani", role: "CREATIVE STAFF", division: "CREATIVE", color: "from-pink-400 to-rose-500" },
        { name: "Najwa Syalwa Kamila", role: "CREATIVE STAFF", division: "CREATIVE", color: "from-pink-400 to-rose-500" },
        { name: "Rizky Firmansyah", role: "CREATIVE STAFF", division: "CREATIVE", color: "from-pink-400 to-rose-500" },
    ],
    EVENT: [
        { name: "Muhammad Faishal Anshary", role: "EVENT STAFF", division: "EVENT", color: "from-yellow-400 to-orange-500" },
        { name: "Naufal Ramadhan", role: "EVENT STAFF", division: "EVENT", color: "from-yellow-400 to-orange-500" },
        { name: "Muhammad Nabil Farras", role: "EVENT STAFF", division: "EVENT", color: "from-yellow-400 to-orange-500" },
        { name: "Fadhil Firoos Rabbani", role: "EVENT STAFF", division: "EVENT", color: "from-yellow-400 to-orange-500" },
        { name: "Alfonso Timothius Sitompul", role: "EVENT STAFF", division: "EVENT", color: "from-yellow-400 to-orange-500" },
        { name: "Bagus Dwi Sasongko", role: "EVENT STAFF", division: "EVENT", color: "from-yellow-400 to-orange-500" },
        { name: "Muhammad Naufal Alaudin", role: "EVENT STAFF", division: "EVENT", color: "from-yellow-400 to-orange-500" },
    ],
    VALORANT: [
        { name: "Cavin Anthonius Imanuel", role: "VALORANT STAFF", division: "VALORANT", color: "from-purple-400 to-pink-400" },
        { name: "I Gede Bagus Agung S.M", role: "VALORANT STAFF", division: "VALORANT", color: "from-purple-400 to-pink-400" },
        { name: "Muhammad Fahmi Athanaya", role: "VALORANT STAFF", division: "VALORANT", color: "from-purple-400 to-pink-400" },
    ],
};

const TABS = Object.keys(ORGANIZATION_DATA);

const BPITreeLayout = () => {
    const getMember = (rolePart: string) => ORGANIZATION_DATA.BPI.find(m => m.role.includes(rolePart));

    const ketua = getMember("KETUA");
    const sek1 = getMember("SEKRETARIS 1");
    const sek2 = getMember("SEKRETARIS 2");
    const ben = getMember("BENDAHARA");
    const wakil1 = getMember("WAKIL KETUA 1");
    const wakil2 = getMember("WAKIL KETUA 2");
    const wakil3 = getMember("WAKIL KETUA 3");
    const cd = getMember("COMMUNITY DIRECTOR");
    const id = getMember("INTERNAL DIRECTOR");

    // Placeholder for Manager
    const manager = {
        name: "To Be Announced",
        role: "MANAGER",
        division: "Talent",
        color: "from-cyan-400 to-blue-500"
    };

    const lineVertical: Variants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: "100%",
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const lineHorizontal: Variants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const goldLineClass = "bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 shadow-[0_0_8px_rgba(251,191,36,0.8)]";
    const goldLineHorizClass = "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-[0_0_8px_rgba(251,191,36,0.8)]";

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4">

            {/* LEVEL 1: KETUA UMUM */}
            <div className="relative flex flex-col items-center mb-12">
                <Reveal>
                    {ketua && <MemberCard {...ketua} />}
                </Reveal>
            </div>

            {/* Vertical Line from Ketua down to Sek/Ben T-junction */}
            <div className="relative w-1 h-16 -mb-8">
                <motion.div
                    variants={lineVertical}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className={`w-full h-full ${goldLineClass}`}
                />
            </div>

            {/* LEVEL 2: SEKRETARIS & BENDAHARA */}
            <div className="relative w-full mb-12">
                {/* Horizontal T-bar above cards */}
                <div className="absolute -top-8 left-0 right-0 flex justify-center pointer-events-none z-0">
                    <div className="relative h-1 w-[85%] lg:w-[75%]">
                        <motion.div
                            variants={lineHorizontal}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                            className={`w-full h-full ${goldLineHorizClass}`}
                        />

                        {/* Three vertical drops to cards */}
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.6 }}
                            className={`absolute top-0 left-[16.666%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                        />
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.6 }}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                        />
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.6 }}
                            className={`absolute top-0 left-[83.333%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                        />
                    </div>
                </div>

                {/* Three Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-[85%] lg:w-[75%] mx-auto">
                    <Reveal delay={200}>
                        <div className="flex flex-col items-center">
                            {sek1 && <MemberCard {...sek1} />}
                        </div>
                    </Reveal>

                    <Reveal delay={250}>
                        <div className="flex flex-col items-center">
                            {sek2 && <MemberCard {...sek2} />}
                        </div>
                    </Reveal>

                    <Reveal delay={300}>
                        <div className="flex flex-col items-center">
                            {ben && <MemberCard {...ben} />}
                        </div>
                    </Reveal>
                </div>

                {/* Bottom connectors from each card */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-0">
                    <div className="relative h-1 w-[85%] lg:w-[75%]">
                        {/* Three vertical lines down from cards */}
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.65 }}
                            className={`absolute bottom-0 left-[16.666%] -translate-x-1/2 w-1 h-12 ${goldLineClass}`}
                        />
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.65 }}
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-12 ${goldLineClass}`}
                        />
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.65 }}
                            className={`absolute bottom-0 left-[83.333%] -translate-x-1/2 w-1 h-12 ${goldLineClass}`}
                        />

                        {/* Horizontal bar connecting the three */}
                        <motion.div
                            variants={lineHorizontal}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.7 }}
                            className={`absolute bottom-0 w-full h-1 ${goldLineHorizClass}`}
                        />
                    </div>
                </div>

                {/* Single vertical line from center down to Wakil */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 -mb-16 z-0">
                    <motion.div
                        variants={lineVertical}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.75 }}
                        className={`w-full h-full ${goldLineClass}`}
                    />
                </div>
            </div>

            {/* LEVEL 3: WAKIL KETUA (3 positions) */}
            <div className="relative w-full mb-16">
                {/* Horizontal T-junction bar */}
                <div className="absolute -top-16 left-0 right-0 flex justify-center pointer-events-none z-0">
                    <div className="relative h-1 w-[90%] lg:w-[85%]">
                        <motion.div
                            variants={lineHorizontal}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.5 }}
                            className={`w-full h-full ${goldLineHorizClass}`}
                        />

                        {/* Three vertical drops from T-bar to Wakil cards */}
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.7 }}
                            className={`absolute top-0 left-[16.666%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                        />
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.7 }}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                        />
                        <motion.div
                            variants={lineVertical}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.7 }}
                            className={`absolute top-0 left-[83.333%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                        />
                    </div>
                </div>

                {/* Three Wakil Ketua Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[90%] lg:w-[85%] mx-auto relative">
                    <Reveal delay={350}>
                        <div className="flex flex-col items-center relative">
                            {wakil1 && <MemberCard {...wakil1} />}
                            {/* Vertical line down from this Wakil */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-20 z-0">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.1 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={400}>
                        <div className="flex flex-col items-center relative">
                            {wakil2 && <MemberCard {...wakil2} />}
                            {/* Vertical line down from this Wakil */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-20 z-0">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.2 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={450}>
                        <div className="flex flex-col items-center relative">
                            {wakil3 && <MemberCard {...wakil3} />}
                            {/* Vertical line down from this Wakil */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-20 z-0">
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.3 }}
                                    className={`w-full h-full ${goldLineClass}`}
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* LEVEL 4: DIRECTORS & MANAGER */}
            <div className="relative w-full mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[90%] lg:w-[85%] mx-auto">
                    {/* Community Director Column */}
                    <div className="flex flex-col items-center relative">
                        {/* Vertical line from Wakil 1 */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 z-0">
                            <motion.div
                                variants={lineVertical}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.9 }}
                                className={`w-full h-full ${goldLineClass}`}
                            />
                        </div>

                        <Reveal delay={600}>
                            {cd && <MemberCard {...cd} />}
                        </Reveal>
                    </div>

                    {/* Internal Director Column */}
                    <div className="flex flex-col items-center relative">
                        {/* Vertical line from Wakil 2 */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 z-0">
                            <motion.div
                                variants={lineVertical}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 1.0 }}
                                className={`w-full h-full ${goldLineClass}`}
                            />
                        </div>

                        <Reveal delay={700}>
                            {id && <MemberCard {...id} />}
                        </Reveal>
                    </div>

                    {/* Manager Column */}
                    <div className="flex flex-col items-center relative">
                        {/* Vertical line from Wakil 3 */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 z-0">
                            <motion.div
                                variants={lineVertical}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 1.1 }}
                                className={`w-full h-full ${goldLineClass}`}
                            />
                        </div>

                        <Reveal delay={800}>
                            <MemberCard {...manager} />
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* LEVEL 5: SUB-DIVISIONS */}
            <div className="relative w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-[90%] lg:w-[85%] mx-auto">

                    {/* COMMUNITY BRANCH - L-shaped with vertical then horizontal right */}
                    <div className="flex flex-col items-center relative">
                        {/* Vertical line down from CD */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-12 z-0">
                            <motion.div
                                variants={lineVertical}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 1.3 }}
                                className={`w-full h-full ${goldLineClass}`}
                            />
                        </div>

                        {/* Horizontal line to the right */}
                        <div className="absolute top-0 left-1/2 w-[60%] h-1 z-0">
                            <motion.div
                                variants={lineHorizontal}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 1.4 }}
                                className={`w-full h-full ${goldLineHorizClass}`}
                            />
                        </div>

                        {/* Game divisions */}
                        <div className="flex flex-col gap-2 items-start w-full pl-[50%]">
                            {['MLBB', 'PUBGM', 'VALORANT', 'HOK', 'FE'].map((game, i) => (
                                <motion.div
                                    key={game}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 + (i * 0.1) }}
                                    className="flex items-center gap-2"
                                >
                                    <div className={`w-8 h-1 ${goldLineHorizClass}`}></div>
                                    <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-xs font-bold text-yellow-200 tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.2)] min-w-[120px] text-center">
                                        {game}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* INTERNAL BRANCH - L-shaped with vertical then horizontal right */}
                    <div className="flex flex-col items-center relative">
                        {/* Vertical line down from ID */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-12 z-0">
                            <motion.div
                                variants={lineVertical}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 1.3 }}
                                className={`w-full h-full ${goldLineClass}`}
                            />
                        </div>

                        {/* Horizontal line to the right */}
                        <div className="absolute top-0 left-1/2 w-[60%] h-1 z-0">
                            <motion.div
                                variants={lineHorizontal}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 1.4 }}
                                className={`w-full h-full ${goldLineHorizClass}`}
                            />
                        </div>

                        {/* Department divisions */}
                        <div className="flex flex-col gap-2 items-start w-full pl-[50%]">
                            {['PR', 'CM', 'MF', 'HRD'].map((dept, i) => (
                                <motion.div
                                    key={dept}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 + (i * 0.1) }}
                                    className="flex items-center gap-2"
                                >
                                    <div className={`w-8 h-1 ${goldLineHorizClass}`}></div>
                                    <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-xs font-bold text-yellow-200 tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.2)] min-w-[120px] text-center">
                                        {dept}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* TALENT BRANCH - Horizontal T-junction */}
                    <div className="flex flex-col items-center relative">
                        {/* Vertical line down from Manager */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-12 z-0">
                            <motion.div
                                variants={lineVertical}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 1.3 }}
                                className={`w-full h-full ${goldLineClass}`}
                            />
                        </div>

                        {/* Horizontal T-bar */}
                        <div className="absolute top-0 left-0 right-0 flex justify-center z-0">
                            <div className="relative h-1 w-full">
                                <motion.div
                                    variants={lineHorizontal}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.4 }}
                                    className={`w-full h-full ${goldLineHorizClass}`}
                                />

                                {/* Three vertical drops */}
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.5 }}
                                    className={`absolute top-0 left-[16.666%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                                />
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.5 }}
                                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                                />
                                <motion.div
                                    variants={lineVertical}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.5 }}
                                    className={`absolute top-0 left-[83.333%] -translate-x-1/2 w-1 h-8 ${goldLineClass}`}
                                />
                            </div>
                        </div>

                        {/* Talent divisions */}
                        <div className="flex justify-between w-full gap-2 pt-10">
                            {['ATLET', 'CASTER', 'BA'].map((talent, i) => (
                                <motion.div
                                    key={talent}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.6 + (i * 0.1) }}
                                    className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-xs font-bold text-yellow-200 tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.2)] text-center flex-1"
                                >
                                    {talent}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

const Organization: React.FC = () => {
    const [activeTab, setActiveTab] = useState('BPI');

    return (
        <section className="relative min-h-screen py-20 overflow-hidden" id="organization">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `
        linear-gradient(rgba(255,215,0,1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,215,0,1) 1px, transparent 1px)
      `,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-16 px-4 select-none">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30 mx-auto">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-primary font-display text-xs font-bold tracking-[0.15em] uppercase">
                                Pengurus
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-display font-black">
                            <span className="text-white">Struktur </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                                <TextScramble text="Kepengurusan" />
                            </span>
                        </h3>
                    </div>
                </Reveal>

                {/* TAB NAVIGATION */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-300 border ${activeTab === tab
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GRID DISPLAY */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'BPI' ? (
                                <BPITreeLayout />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                                    {ORGANIZATION_DATA[activeTab].map((member, index) => (
                                        <Reveal key={index} delay={index * 100}>
                                            <MemberCard
                                                name={member.name}
                                                role={member.role}
                                                division={member.division}
                                                color={member.color}
                                            />
                                        </Reveal>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Organization;

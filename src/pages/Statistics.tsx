import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { fetchMatches, buildForm, getTeamLogoFor, type DisplayMatch } from "@/lib/adminMatches";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Import team logos
import logoGrude from "@/assets/logos/hkk_grude.png";
import logoLjubuski from "@/assets/logos/hkk_ljubuski.png";
import logoMostar from "@/assets/logos/hkk_mostar.png";
import logoRama from "@/assets/logos/hkk_rama.png";
import logoSiroki from "@/assets/logos/hkk_siroki.png";
import logoTomislav from "@/assets/logos/hkk_tomislav.png";
import logoPosusje from "@/assets/logos/kk_posusje.png";
import logoCapljina from "@/assets/logos/hkk_capljina.png";
import logoKSHB from "@/assets/logos/kshb_logo.png";
import supersportAsset from "@/assets/logos/supersport-premijer.png.asset.json";
import logoZadar from "@/assets/logos/kk_zadar.png";
import logoCibona from "@/assets/logos/kk_cibona.png";
import logoSplit from "@/assets/logos/kk_split.png";
import logoSamobor from "@/assets/logos/kk_samobor.png";
import logoDubrovnik from "@/assets/logos/kk_dubrovnik.png";
import logoZabok from "@/assets/logos/kk_zabok.png";
import logoDubrava from "@/assets/logos/kk_dubrava.png";
import logoKvarner from "@/assets/logos/kk_kvarner.png";
import logoCedevitaJunior from "@/assets/logos/kk_cedevita_junior.png";
import logoDinamo from "@/assets/logos/kk_dinamo_zagreb.png";
import logoSibenka from "@/assets/logos/kk_sibenka.png";
import logoAlkar from "@/assets/logos/kk_posusje.png";
const supersportLogo = supersportAsset.url;
import enblAsset from "@/assets/logos/enbl.png.asset.json";
import kkcupAsset from "@/assets/logos/kresimir_cosic_cup.png.asset.json";
const enblLogo = enblAsset.url;
const kkcupLogo = kkcupAsset.url;


// Import ŽKK logos
import logoZkkPosusje from "@/assets/logos/zkk_posusje.png";
import logoZkkTomislav from "@/assets/logos/zkk_tomislav.png";
import logoZkkZrinjski from "@/assets/logos/zkk_zrinjski.png";
import logoZkkLivno from "@/assets/logos/zkk_livno.png";

// Import player images
import playerRamljak from "@/assets/player-ramljak.png";
import playerKovac from "@/assets/player-kovac-new.png";
import playerDerek from "@/assets/player-derek.png";
import playerProtrka from "@/assets/player-protrka.png";
import playerBegic from "@/assets/player-begic.png";
import playerPavkovic from "@/assets/player-pavkovic-new.png";
import playerBasicLuka from "@/assets/player-basic-luka.png";

// Alkar player images
import imgDeantoni from "@/assets/deantoni_gordon.png.asset.json";
import imgDuje from "@/assets/duje_brala.png.asset.json";
import imgTray from "@/assets/tray_hollowell.png.asset.json";
import imgTerrell from "@/assets/terrell_burden.png.asset.json";
import imgPavle from "@/assets/pavle_marcinkovic.png.asset.json";
import imgFabian from "@/assets/fabian_sisko.png.asset.json";
import imgMirko from "@/assets/mirko_jukic.png.asset.json";
import imgMarioK from "@/assets/mario_kresic.png.asset.json";
import imgJarred from "@/assets/jarred_hyder.png.asset.json";
import imgLuka from "@/assets/luka_cvitanovic.png.asset.json";
import imgKlepo from "@/assets/antonio_klepo.png.asset.json";
import imgMladen from "@/assets/mladen_tomasevic.png.asset.json";
import imgSpaleta from "@/assets/mario_spaleta.png.asset.json";
import imgKaramarko from "@/assets/gabriel_karamarko.png.asset.json";
import imgBorna from "@/assets/borna_jurela.png.asset.json";
import imgMaksim from "@/assets/maksim_matulina.png.asset.json";
import imgEmanuel from "@/assets/emanuel_domazet.png.asset.json";
import imgIvan from "@/assets/ivan_pavela.png.asset.json";
import imgMarijan from "@/assets/marijan_mastelic.png.asset.json";
import imgBrzovic from "@/assets/ante_brzovic.png.asset.json";
import imgQuinton from "@/assets/quinton_morton.png.asset.json";
import imgVlatko from "@/assets/vlatko_granic.png.asset.json";

const playerImageMap: Record<string, string> = {
  "Deantoni Gordon": imgDeantoni.url,
  "Duje Brala": imgDuje.url,
  "Tray Hollowell": imgTray.url,
  "Terrell Burden": imgTerrell.url,
  "Pavle Marčinković": imgPavle.url,
  "Fabian Šiško": imgFabian.url,
  "Mirko Jukić": imgMirko.url,
  "Mario Krešić": imgMarioK.url,
  "Jarred Hyder": imgJarred.url,
  "Luka Cvitanović": imgLuka.url,
  "Antonio Klepo": imgKlepo.url,
  "Mladen Tomašević": imgMladen.url,
  "Mario Spaleta": imgSpaleta.url,
  "Gabriel Karamarko": imgKaramarko.url,
  "Borna Jurela": imgBorna.url,
  "Maksim Matulina": imgMaksim.url,
  "Emanuel Domazet": imgEmanuel.url,
  "Ivan Pavela": imgIvan.url,
  "Marijan Mastelić": imgMarijan.url,
  "Ante Brzović": imgBrzovic.url,
  "Quinton Morton-Robertson": imgQuinton.url,
  "Vlatko Granic": imgVlatko.url,
  "Vlatko Granić": imgVlatko.url,
};

// Import flag images
import flagBih from "@/assets/flags/bih-flag.png";
import flagCro from "@/assets/flags/cro-flag.png";
import flagUsa from "@/assets/flags/usa-flag.png";

// Logo mapping
const teamLogos: Record<string, string> = {
  "HKK Grude": logoGrude,
  "HKK Ljubuški": logoLjubuski,
  "HKK Mostar": logoMostar,
  "HKK Rama": logoRama,
  "HKK Široki": logoSiroki,
  "HKK Široki II": logoSiroki,
  "KK Široki": logoSiroki,
  "HKK Tomislav": logoTomislav,
  "KK Tomislavgrad": logoTomislav,
  "HKK Posušje": logoPosusje,
  "KK Posušje": logoPosusje,
  "HŽKK Posušje": logoZkkPosusje,
  "Čapljina": logoCapljina,
  "HKK Čapljina": logoCapljina,
  "ŽKK Zrinjski 2010": logoZkkZrinjski,
  "ŽKK Livno": logoZkkLivno,
  "HŽKK Tomislav": logoZkkTomislav,
  "Zadar": logoZadar,
  "Cibona": logoCibona,
  "Split": logoSplit,
  "Samobor": logoSamobor,
  "Dubrovnik": logoDubrovnik,
  "Zabok": logoZabok,
  "Dubrava": logoDubrava,
  "Kvarner": logoKvarner,
  "Alkar": logoAlkar,
  "Cedevita Junior": logoCedevitaJunior,
  "Dinamo": logoDinamo,
  "Šibenka": logoSibenka,
};

interface Match {
  id: number;
  date: string;
  time?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  isUpcoming: boolean;
  sofascoreLink?: string;
  competition?: string;
}

interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  pct: string;
  diff: number;
  last5: ("W" | "L")[];
  points: number;
  streak: string;
  group?: "playoff" | "playout" | "relegation";
}

interface WomenStanding {
  position: number;
  team: string;
  points: number;
}

interface Player {
  number: string;
  name: string;
  position: string;
  nationality: string;
  height?: string;
  dateOfBirth?: string;
  age?: number;
  image?: string;
  sofascoreLink?: string;
}

interface TopPlayer {
  rank: number;
  name: string;
  position: string;
  value: number | string;
  image?: string;
}

// formData & matches are loaded dynamically inside the Statistics component from Supabase.


// Standings data
const standings: Standing[] = [
  { position: 1, team: "Zadar", played: 33, won: 29, lost: 4, pct: "0.879", diff: 525, last5: ["W","L","W","W","W"], points: 62, streak: "W3", group: "playoff" },
  { position: 2, team: "Cibona", played: 33, won: 25, lost: 8, pct: "0.758", diff: 287, last5: ["W","W","W","W","W"], points: 58, streak: "W10", group: "playoff" },
  { position: 3, team: "Split", played: 33, won: 25, lost: 8, pct: "0.758", diff: 339, last5: ["L","W","W","L","W"], points: 58, streak: "W1", group: "playoff" },
  { position: 4, team: "Samobor", played: 33, won: 18, lost: 15, pct: "0.545", diff: 53, last5: ["W","L","W","W","W"], points: 51, streak: "W2", group: "playoff" },
  { position: 5, team: "Dubrovnik", played: 33, won: 17, lost: 16, pct: "0.515", diff: -70, last5: ["L","W","W","W","W"], points: 50, streak: "W4", group: "playoff" },
  { position: 6, team: "Zabok", played: 33, won: 15, lost: 18, pct: "0.455", diff: -30, last5: ["L","L","L","L","W"], points: 48, streak: "W1", group: "playoff" },
  { position: 7, team: "Dubrava", played: 33, won: 15, lost: 18, pct: "0.455", diff: -56, last5: ["W","W","L","L","L"], points: 48, streak: "L3", group: "playoff" },
  { position: 8, team: "Kvarner", played: 33, won: 12, lost: 21, pct: "0.364", diff: -140, last5: ["L","L","L","W","L"], points: 45, streak: "L1", group: "playoff" },
  { position: 9, team: "Alkar", played: 33, won: 12, lost: 21, pct: "0.364", diff: -261, last5: ["W","L","W","L","L"], points: 45, streak: "L2", group: "playoff" },
  { position: 10, team: "Cedevita Junior", played: 33, won: 12, lost: 21, pct: "0.364", diff: -102, last5: ["W","W","W","L","L"], points: 45, streak: "L2", group: "playoff" },
  { position: 11, team: "Dinamo", played: 33, won: 10, lost: 23, pct: "0.303", diff: -181, last5: ["L","L","L","L","L"], points: 43, streak: "L10", group: "playout" },
  { position: 12, team: "Šibenka", played: 33, won: 8, lost: 25, pct: "0.242", diff: -364, last5: ["W","L","W","W","L"], points: 41, streak: "L1", group: "relegation" },
];

// Women standings data
const womenStandings: WomenStanding[] = [
  { position: 1, team: "ŽKK Alkar Sinj", points: 3 },
  { position: 2, team: "ŽKK Zrinjski 2010", points: 3 },
  { position: 3, team: "ŽKK Livno", points: 2 },
  { position: 4, team: "HŽKK Tomislav", points: 1 },
];

// Players roster - based on Team.tsx players
const players: Player[] = [
  // Bekovi
  { number: "1", name: "Emanuel Domazet", position: "Bek", nationality: "CRO", height: "178 cm", dateOfBirth: "03.02.2007.", age: 19 },
  { number: "31", name: "Gabriel Karamarko", position: "Bek", nationality: "CRO", height: "186 cm", dateOfBirth: "24.09.2004.", age: 21 },
  { number: "10", name: "Maksim Matulina", position: "Bek", nationality: "CRO", height: "189 cm", dateOfBirth: "25.11.2003.", age: 22 },
  { number: "0", name: "Tray Hollowell", position: "Bek", nationality: "USA", height: "190 cm", dateOfBirth: "16.07.1998.", age: 28 },
  { number: "1", name: "Terrell Burden", position: "Bek", nationality: "USA", height: "178 cm", dateOfBirth: "25.11.2000.", age: 25 },
  { number: "35", name: "Mirko Jukić", position: "Bek", nationality: "CRO", height: "198 cm", dateOfBirth: "26.06.2003.", age: 23 },
  { number: "7", name: "Ivan Pavela", position: "Bek", nationality: "CRO", height: "184 cm", dateOfBirth: "07.10.2005.", age: 20 },
  { number: "24", name: "Borna Jurela", position: "Bek", nationality: "CRO", height: "196 cm", dateOfBirth: "15.12.2003.", age: 22 },
  { number: "0", name: "Jarred Hyder", position: "Bek", nationality: "USA", height: "190 cm", dateOfBirth: "16.06.2001.", age: 25 },
  { number: "3", name: "Luka Cvitanović", position: "Bek", nationality: "CRO", height: "192 cm", dateOfBirth: "08.01.2000.", age: 26 },
  { number: "-", name: "Quinton Morton-Robertson", position: "Bek", nationality: "USA", height: "173 cm", dateOfBirth: "12.04.2001.", age: 25 },
  // Krila
  { number: "1", name: "Ante Brzović", position: "Krilo", nationality: "CRO", height: "208 cm", dateOfBirth: "02.06.2000.", age: 26 },
  { number: "8", name: "Fabian Šiško", position: "Krilo", nationality: "CRO", height: "198 cm", dateOfBirth: "11.04.2003.", age: 23 },
  { number: "9", name: "Antonio Klepo", position: "Krilo", nationality: "CRO", height: "190 cm", dateOfBirth: "12.04.2004.", age: 22 },
  { number: "12", name: "Duje Brala", position: "Krilo", nationality: "CRO", height: "196 cm", dateOfBirth: "04.02.2003.", age: 23 },
  { number: "2", name: "Pavle Marčinković", position: "Krilo", nationality: "CRO", height: "197 cm", dateOfBirth: "06.05.1989.", age: 37 },
  { number: "11", name: "Marijan Mastelić", position: "Krilo", nationality: "CRO", height: "198 cm", dateOfBirth: "10.10.2007.", age: 18 },
  // Centri
  { number: "17", name: "Mladen Tomašević", position: "Centar", nationality: "CRO", height: "203 cm", dateOfBirth: "18.09.2003.", age: 22 },
  { number: "12", name: "Mario Krešić", position: "Centar", nationality: "CRO", height: "203 cm", dateOfBirth: "26.11.2002.", age: 23 },
  { number: "4", name: "Deantoni Gordon", position: "Centar", nationality: "USA", height: "203 cm", dateOfBirth: "28.09.2000.", age: 25 },
  { number: "32", name: "Vlatko Granic", position: "Centar", nationality: "CRO", height: "206 cm", dateOfBirth: "15.07.1994.", age: 32 },
  { number: "15", name: "Mario Spaleta", position: "Centar", nationality: "CRO", height: "210 cm", dateOfBirth: "04.12.1995.", age: 30 },
];


// Top players data (KK Alkar Sinj — sezona 2025/26)
const topScorers: TopPlayer[] = [
  { rank: 1, name: "Deantoni Gordon", position: "Centar", value: 11 },
  { rank: 2, name: "Duje Brala", position: "Krilo", value: 11 },
  { rank: 3, name: "Tray Hollowell", position: "Bek", value: 11 },
];

const topRebounders: TopPlayer[] = [
  { rank: 1, name: "Deantoni Gordon", position: "Centar", value: 5 },
  { rank: 2, name: "Duje Brala", position: "Krilo", value: 5 },
  { rank: 3, name: "Pavle Marčinković", position: "Krilo", value: 5 },
];

const topAssisters: TopPlayer[] = [
  { rank: 1, name: "Terrell Burden", position: "Bek", value: 4 },
  { rank: 2, name: "Pavle Marčinković", position: "Krilo", value: 3 },
  { rank: 3, name: "Tray Hollowell", position: "Bek", value: 3 },
];

const topMinutes: TopPlayer[] = [
  { rank: 1, name: "Tray Hollowell", position: "Bek", value: "30:12" },
  { rank: 2, name: "Deantoni Gordon", position: "Centar", value: "28:45" },
  { rank: 3, name: "Terrell Burden", position: "Bek", value: "27:58" },
];

const topSteals: TopPlayer[] = [
  { rank: 1, name: "Terrell Burden", position: "Bek", value: 1.8 },
  { rank: 2, name: "Tray Hollowell", position: "Bek", value: 1.5 },
  { rank: 3, name: "Ivan Pavela", position: "Bek", value: 1.1 },
];

const topBlocks: TopPlayer[] = [
  { rank: 1, name: "Deantoni Gordon", position: "Centar", value: 1 },
  { rank: 2, name: "Mario Spaleta", position: "Centar", value: 1 },
  { rank: 3, name: "Ante Brzović", position: "Krilo", value: 0.5 },
];

const top2PPercentage: TopPlayer[] = [
  { rank: 1, name: "Mario Spaleta", position: "Centar", value: "63.4%" },
  { rank: 2, name: "Deantoni Gordon", position: "Centar", value: "58.2%" },
  { rank: 3, name: "Duje Brala", position: "Krilo", value: "54.7%" },
];

const top3PPercentage: TopPlayer[] = [
  { rank: 1, name: "Pavle Marčinković", position: "Krilo", value: "41.3%" },
  { rank: 2, name: "Tray Hollowell", position: "Bek", value: "38.9%" },
  { rank: 3, name: "Fabian Šiško", position: "Krilo", value: "36.1%" },
];

const topThrees: TopPlayer[] = [
  { rank: 1, name: "Tray Hollowell", position: "Bek", value: 52 },
  { rank: 2, name: "Jarred Hyder", position: "Bek", value: 44 },
  { rank: 3, name: "Fabian Šiško", position: "Krilo", value: 31 },
];

const topDefRebounds: TopPlayer[] = [
  { rank: 1, name: "Deantoni Gordon", position: "Centar", value: 6.7 },
  { rank: 2, name: "Vlatko Granic", position: "Centar", value: 4.8 },
  { rank: 3, name: "Mario Spaleta", position: "Centar", value: 4.5 },
];

const topOffRebounds: TopPlayer[] = [
  { rank: 1, name: "Mario Spaleta", position: "Centar", value: 2.1 },
  { rank: 2, name: "Deantoni Gordon", position: "Centar", value: 1.9 },
  { rank: 3, name: "Mario Krešić", position: "Centar", value: 1.4 },
];

const topDoubleDoubles: TopPlayer[] = [
  { rank: 1, name: "Deantoni Gordon", position: "Centar", value: 4 },
  { rank: 2, name: "Mario Spaleta", position: "Centar", value: 2 },
  { rank: 3, name: "Tray Hollowell", position: "Bek", value: 1 },
];

// All top player categories
const allTopCategories = [
  { title: "Poeni", data: topScorers },
  { title: "Skokovi", data: topRebounders },
  { title: "Asistencije", data: topAssisters },
  { title: "Ukradene lopte", data: topSteals },
  { title: "Blokade", data: topBlocks },
  { title: "Minute", data: topMinutes },
  { title: "Šut za 2p %", data: top2PPercentage },
  { title: "Šut za 3p %", data: top3PPercentage },
  { title: "Trojke", data: topThrees },
  { title: "Obrambeni skokovi", data: topDefRebounds },
  { title: "Skokovi u napadu", data: topOffRebounds },
  { title: "Double-double", data: topDoubleDoubles },
];


const Statistics = () => {
  const [activeMainTab, setActiveMainTab] = useState("standings");
  const [activePlayersTab, setActivePlayersTab] = useState("top");
  const [matchPage, setMatchPage] = useState(0);
  const [hoveredFormIndex, setHoveredFormIndex] = useState<number | null>(null);
  const [leagueCategory, setLeagueCategory] = useState<"seniori" | "seniorke">("seniori");
  const [topPlayersPage, setTopPlayersPage] = useState(0);
  
  const [dynamicMatches, setDynamicMatches] = useState<DisplayMatch[]>([]);

  useEffect(() => {
    fetchMatches().then(setDynamicMatches).catch(() => setDynamicMatches([]));
  }, []);

  // Backwards-compatible aliases so existing JSX below keeps working
  const matches = useMemo(() => {
    return dynamicMatches.map((m) => ({
      id: m.id as unknown as number,
      date: m.date,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      homeScore: m.isUpcoming ? undefined : m.homeScore,
      awayScore: m.isUpcoming ? undefined : m.awayScore,
      isUpcoming: m.isUpcoming,
      sofascoreLink: m.sofascoreLink,
      competition: m.competition,
      _display: m,
    }));
  }, [dynamicMatches]);

  const formData = useMemo(() => {
    return buildForm(dynamicMatches, 7).map((f) => ({
      opponent: f.opponent,
      logo: getTeamLogoFor(dynamicMatches.find((m) => m.id === f.id)!, f.opponent),
      result: f.result,
      homeTeam: f.homeTeam,
      awayTeam: f.awayTeam,
      homeScore: f.homeScore,
      awayScore: f.awayScore,
    }));
  }, [dynamicMatches]);

  const navigate = useNavigate();



  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Fixed matches-per-page based on active tab
  const rightColRef = useRef<HTMLDivElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);
  const gamesHeaderRef = useRef<HTMLDivElement>(null);
  const matchesPerPage = useMemo(() => {
    if (activeMainTab === "standings") return 8;
    if (activeMainTab === "statistics") return 10;
    if (activeMainTab === "players") {
      return activePlayersTab === "squad" ? 17 : 8;
    }
    return 9;
  }, [activeMainTab, activePlayersTab]);

  // Sort matches: upcoming first, then played (most recent first)
  const upcomingMatches = matches.filter(m => m.isUpcoming);
  const playedMatches = matches.filter(m => !m.isUpcoming);

  const firstPagePlayedCount = Math.max(0, matchesPerPage - upcomingMatches.length);
  const firstPageMatches = [...upcomingMatches, ...playedMatches.slice(0, firstPagePlayedCount)];
  const remainingAfterPage0 = playedMatches.slice(firstPagePlayedCount);
  const totalMatchPages = remainingAfterPage0.length > 0
    ? 1 + Math.ceil(remainingAfterPage0.length / matchesPerPage)
    : 1;

  const displayedMatches = matchPage === 0
    ? firstPageMatches
    : remainingAfterPage0.slice((matchPage - 1) * matchesPerPage, matchPage * matchesPerPage);

  useEffect(() => {
    if (matchPage > totalMatchPages - 1) setMatchPage(0);
  }, [totalMatchPages, matchPage]);

  const getTeamLogo = (teamName: string) => teamLogos[teamName] || null;
  const getMatchTeamLogo = (match: any, teamName: string) => {
    if (match?._display) return getTeamLogoFor(match._display, teamName);
    return teamLogos[teamName] || null;
  };
  const getStatsLogoClass = (teamName: string) => {
    if (teamName.includes("Alkar")) return "w-7 h-7";
    if (teamName.includes("Široki")) return "w-6 h-6";
    if (teamName.includes("Tomislav")) return "w-4 h-4";
    if (teamName.includes("Dubrava") || teamName.includes("Kvarner") || teamName.includes("Samobor") || teamName.includes("Zabok")) return "w-[18px] h-[18px]";
    if (teamName.includes("Cibona") || teamName.includes("Dubrovnik")) return "w-[17px] h-[17px]";
    return "w-5 h-5";
  };

  const getMatchResult = (match: Match) => {
    if (match.isUpcoming) return null;
    const isPosusjeHome = match.homeTeam.includes("Alkar") || match.homeTeam.includes("Posušje");
    const posusjeScore = isPosusjeHome ? match.homeScore : match.awayScore;
    const opponentScore = isPosusjeHome ? match.awayScore : match.homeScore;
    return posusjeScore! > opponentScore! ? "W" : "L";
  };

  const getFlagImage = (nationality: string) => {
    if (nationality === "BIH") return flagBih;
    if (nationality === "HRV" || nationality === "CRO") return flagCro;
    if (nationality === "USA") return flagUsa;
    return null;
  };

  const getFlagEmoji = (nationality: string) => {
    const flags: Record<string, string> = {
      "BIH": "🇧🇦",
      "HRV": "🇭🇷",
      "SRB": "🇷🇸",
      "USA": "🇺🇸",
      "CAN": "🇨🇦",
    };
    return flags[nationality] || "🏳️";
  };

  return (
    <div
      className="min-h-screen"
      style={{
        
        background:
          'linear-gradient(135deg, hsl(220 79% 15%) 0%, hsl(217 68% 30%) 50%, hsl(220 79% 12%) 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <style>{`
        .stats-light {
          --background: 0 0% 100%;
          --foreground: 220 75% 23%;
          --secondary: 43 68% 92%;
          --secondary-foreground: 220 75% 23%;
          --muted: 43 60% 88%;
          --muted-foreground: 220 30% 40%;
          --border: 38 88% 32%;
          --card: 43 68% 92%;
          --card-foreground: 220 75% 23%;
          --input: 43 60% 88%;
          --ring: 38 88% 32%;
          color: #0E2A63;
        }
        .stats-light .text-green-400 { color: rgb(21 128 61); }
        .stats-light .text-red-400 { color: rgb(185 28 28); }
        .stats-light .text-primary { color: #0E2A63; }
        .stats-light svg { transition: transform 0.25s ease, color 0.25s ease; }
        .stats-light [class*="border-border"],
        .stats-light [class*="border-primary"] { border-color: #8a5a0b !important; }
        .stats-light .bg-secondary\\/30,
        .stats-light .bg-secondary\\/40,
        .stats-light .bg-secondary\\/50,
        .stats-light .bg-card { background-color: #faf3e0 !important; transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease; }
        .stats-light .bg-secondary\\/30:hover,
        .stats-light .bg-secondary\\/40:hover,
        .stats-light .bg-secondary\\/50:hover {
          box-shadow: 0 10px 28px -12px rgba(138, 90, 11, 0.55), 0 0 0 1px rgba(138, 90, 11, 0.4);
          transform: translateY(-2px);
        }
        .stats-light button, .stats-light a { transition: all 0.25s ease; }
        .stats-light button:hover svg { transform: scale(1.08); }
        .stats-light .rounded-xl, .stats-light .rounded-lg { box-shadow: 0 4px 14px -8px rgba(14, 42, 99, 0.15); }
        .stats-header-navy { background-color: transparent; }
        .stats-back-btn-text {
          color: #ffffff;
          transition: all 0.25s ease;
          text-shadow: 0 2px 6px rgba(0,0,0,0.35);
        }
        .stats-back-btn-text:hover { color: #f0d78c; transform: translateX(-3px); }
        .stats-rank-badge {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 22px; height: 22px; padding: 0 6px;
          border-radius: 9999px; border: 1.5px solid;
          font-size: 10px; font-weight: 700;
        }
      `}</style>

      <SEO
        title="Statistika i tablica lige — KK Alkar Sinj"
        description="Tablica SuperSport Premijer lige, raspored utakmica, rezultati i statistike igrača KK Alkar Sinj u sezoni 2025/26."
        path="/statistika"
      />
      <h1 className="sr-only">Statistika i sastav momčadi KK Alkar Sinj</h1>
      {/* Header */}
      <header className="stats-header-navy border-b border-white/10 sticky top-0 z-50 backdrop-blur-md" style={{ zoom: 0.9 }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("restoreHomeScroll", "true");
                navigate("/");
              }}
              className="stats-back-btn-text mr-auto inline-flex items-center gap-2 text-base font-display tracking-wider"
            >
              <ArrowLeft className="w-5 h-5" />
              Natrag
            </button>
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:ml-4">
              <img loading="lazy" decoding="async" src={logoAlkar} alt="KK Alkar Sinj" className="w-[4.375rem] h-[4.375rem] object-contain transition-transform duration-300 hover:scale-110" />
              <span className="font-display text-[1.53rem] text-white">KK Alkar Sinj</span>
            </div>
            <h2 className="font-display text-4xl text-white hidden md:block absolute left-1/2 -translate-x-1/2 tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">STATISTIKA</h2>
            <div className="w-20 hidden md:block"></div>
          </div>
        </div>
      </header>


      <main className="stats-light container mx-auto px-4 py-6" style={{ zoom: 0.72 }}>
        {/* Mobile Title */}
        <h2 className="font-display text-3xl text-white text-center mb-6 md:hidden drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">STATISTIKA</h2>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start">
          {/* Left Column - Form & Games */}
          <div className="lg:col-span-3 flex flex-col gap-3 order-2 lg:order-1">
            {/* Recent Form */}
            <div ref={formBoxRef} className="bg-secondary/30 rounded-xl p-2 border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <h3 className="font-display text-lg text-foreground mb-1 text-center">Nedavna forma</h3>
              
              {/* Dynamic text - changes on hover */}
              <p className="text-[10px] text-muted-foreground text-center mb-1 h-4 transition-all duration-200">
                {hoveredFormIndex !== null 
                  ? `${formData[hoveredFormIndex].homeTeam} ${formData[hoveredFormIndex].homeScore} - ${formData[hoveredFormIndex].awayScore} ${formData[hoveredFormIndex].awayTeam}`
                  : "Pređite mišem iznad stupca za detalje"
                }
              </p>
              
              {/* Team logos */}
              <div className="flex gap-1 mb-1 justify-center">
                {formData.map((game, index) => (
                  <div 
                    key={index} 
                    className="w-7 h-7 rounded-full bg-background/50 flex items-center justify-center p-0.5 hover:scale-110 transition-transform cursor-pointer" 
                    title={game.opponent}
                    onMouseEnter={() => setHoveredFormIndex(index)}
                    onMouseLeave={() => setHoveredFormIndex(null)}
                  >
                    <img loading="lazy" decoding="async" src={game.logo} alt={game.opponent} className={`object-contain w-full h-full ${
                      game.opponent.includes("Široki") || game.opponent.includes("Grude")
                        ? "scale-[1.6]" 
                        : game.opponent.includes("Rama") || game.opponent.includes("Ljubuš")
                          ? "scale-[1.3]"
                        : game.opponent.includes("Čapljina") || game.opponent === "Čapljina"
                          ? "scale-[1.15]"
                        : game.opponent.includes("Mostar") || game.opponent.includes("Tomislav")
                          ? "scale-[1.1]"
                          : "scale-[0.85]"
                    }`} />
                  </div>
                ))}
              </div>
              
              {/* Win/Loss bars */}
              <div className="flex gap-1 justify-center">
                {formData.map((game, index) => (
                  <div
                    key={index}
                    className={`w-7 h-5 rounded cursor-pointer transition-all duration-200 hover:scale-110 ${
                      game.result === "W" ? "bg-green-500 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/30" : "bg-red-500 hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/30"
                    }`}
                    onMouseEnter={() => setHoveredFormIndex(index)}
                    onMouseLeave={() => setHoveredFormIndex(null)}
                  />
                ))}
              </div>
            </div>

            {/* Games */}
            <div className="bg-secondary/30 rounded-xl border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col flex-1">
              <div ref={gamesHeaderRef} className="p-2 border-b border-border/30 flex items-center justify-between">
                <button 
                  onClick={() => setMatchPage(p => Math.max(0, p - 1))}
                  disabled={matchPage === 0}
                  className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center hover:bg-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} className="text-primary" />
                </button>
                <h3 className="font-display text-lg text-foreground text-center">Utakmice</h3>
                <button 
                  onClick={() => setMatchPage(p => Math.min(totalMatchPages - 1, p + 1))}
                  disabled={matchPage >= totalMatchPages - 1}
                  className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center hover:bg-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={14} className="text-primary" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={matchPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="divide-y divide-border/20 flex-1 flex flex-col justify-start"
                >
                  {displayedMatches.map((match) => {
                    const result = getMatchResult(match);
                    const homeLogo = getMatchTeamLogo(match, match.homeTeam);
                    const awayLogo = getMatchTeamLogo(match, match.awayTeam);
                    
                    const matchContent = (
                      <div className={`px-2 py-[7px] hover:bg-secondary/50 transition-all duration-200 ${!match.isUpcoming ? 'cursor-pointer hover:shadow-md' : ''}`}>
                        <div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span>{match.date}</span>
                            {(match as any).time && <span>{(match as any).time}</span>}
                            {match.competition === "ENBL" ? (
                              <span className="inline-flex items-center gap-1 bg-primary/10 px-1.5 py-0.5 rounded">
                                <img loading="lazy" decoding="async" src={enblLogo} alt="ENBL" className="h-4 object-contain" />
                                <span className="text-xs font-bold text-foreground">ENBL</span>
                              </span>
                            ) : match.competition === "Krešimir Ćosić Cup" ? (
                              <span className="inline-flex items-center gap-1 bg-primary/10 px-1.5 py-0.5 rounded">
                                <img loading="lazy" decoding="async" src={kkcupLogo} alt="Krešimir Ćosić Cup" className="h-6 object-contain" />
                                <span className="text-xs font-bold text-foreground">Krešimir Ćosić Cup</span>
                              </span>
                            ) : match.competition?.includes("🏆") || match.competition?.includes("Kup") ? (
                              <span className="text-xs font-bold text-foreground bg-primary/10 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                                {match.competition}
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-foreground bg-primary/10 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                                {match.competition || "SuperSport PL"}
                                <img loading="lazy" decoding="async" src={supersportLogo} alt="SuperSport PL" className="h-3.5 object-contain -mt-0.5" />
                              </span>
                            )}

                            
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex-1">
                              {/* Home Team */}
                              <div className="flex items-center justify-between mb-0.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                    {homeLogo && <img loading="lazy" decoding="async" src={homeLogo} alt="" className={`object-contain ${getStatsLogoClass(match.homeTeam)}`} />}
                                  </div>
                                  <span className={`text-sm font-bold ${(match.homeTeam.includes("Alkar") || match.homeTeam.includes("Posušje")) ? "text-primary" : "text-foreground"}`}>
                                    {match.homeTeam}
                                  </span>
                                </div>
                                {!match.isUpcoming && (
                                  <span className={`text-sm font-bold ${match.homeScore! > match.awayScore! ? "text-foreground" : "text-muted-foreground"}`}>
                                    {match.homeScore}
                                  </span>
                                )}
                              </div>
                              
                              {/* Away Team */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                    {awayLogo && <img loading="lazy" decoding="async" src={awayLogo} alt="" className={`object-contain ${getStatsLogoClass(match.awayTeam)}`} />}
                                  </div>
                                  <span className={`text-sm font-bold ${(match.awayTeam.includes("Alkar") || match.awayTeam.includes("Posušje")) ? "text-primary" : "text-foreground"}`}>
                                    {match.awayTeam}
                                  </span>
                                </div>
                                {!match.isUpcoming && (
                                  <span className={`text-sm font-bold ${match.awayScore! > match.homeScore! ? "text-foreground" : "text-muted-foreground"}`}>
                                    {match.awayScore}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {result && (
                              <div className="ml-2 flex items-center">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                                  result === "W" ? "bg-green-500" : "bg-red-500"
                                }`}>
                                  {result}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                    
                    return match.sofascoreLink ? (
                      <a 
                        key={match.id} 
                        href={match.sofascoreLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {matchContent}
                      </a>
                    ) : (
                      <div key={match.id}>{matchContent}</div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div ref={rightColRef} className="lg:col-span-9 order-1 lg:order-2">
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
              <TabsList className="w-full bg-transparent border-0 rounded-xl p-0 mb-5 overflow-hidden gap-0">
                <TabsTrigger value="standings" style={{ backgroundColor: '#faf3e0', color: '#0E2A63' }} className="flex-1 font-display text-xl md:text-2xl data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all duration-200">
                  Poredak
                </TabsTrigger>
                <TabsTrigger value="players" style={{ backgroundColor: '#faf3e0', color: '#0E2A63' }} className="flex-1 font-display text-xl md:text-2xl data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all duration-200">
                  Igrači
                </TabsTrigger>
                <TabsTrigger value="statistics" style={{ backgroundColor: '#faf3e0', color: '#0E2A63' }} className="flex-1 font-display text-xl md:text-2xl data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground transition-all duration-200">
                  Tim
                </TabsTrigger>
              </TabsList>

              {/* Standings Tab */}
              <TabsContent value="standings" className="mt-0">
                <div className="bg-secondary/30 rounded-xl border border-border/30 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="p-3 border-b border-border/30">
                    <div className="flex items-center gap-2 flex-wrap">
                      <img loading="lazy" decoding="async" src={supersportLogo} alt="SuperSport PL" className="h-8 md:h-10 object-contain" />
                      <span className="text-xs md:text-sm text-foreground">SuperSport Premijer Liga</span>
                      <span className="text-xs md:text-sm text-muted-foreground bg-background/50 px-2 py-0.5 rounded">25/26</span>
                      <span className="text-xs md:text-sm text-foreground bg-background/50 px-2 py-0.5 rounded ml-1">Seniori</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/30">
                          <TableHead className="w-6 md:w-10 text-center text-[10px] md:text-sm font-bold px-0.5 md:px-4 py-1 md:py-3">#</TableHead>
                          <TableHead className="text-[10px] md:text-sm font-bold px-0.5 md:px-4 py-1 md:py-3">Ekipa</TableHead>
                          <TableHead className="text-center w-5 md:w-10 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">P</TableHead>
                          <TableHead className="text-center w-5 md:w-10 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">W</TableHead>
                          <TableHead className="text-center w-5 md:w-10 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">L</TableHead>
                          <TableHead className="text-center w-8 md:w-14 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">PCT</TableHead>
                          <TableHead className="text-center w-7 md:w-14 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">DIFF</TableHead>
                          <TableHead className="text-center w-28 text-sm font-bold hidden sm:table-cell py-1 md:py-3">Zadnjih 5</TableHead>
                          <TableHead className="text-center w-7 md:w-14 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">PTS</TableHead>
                          <TableHead className="text-center w-8 md:w-12 text-[10px] md:text-sm font-bold px-0 md:px-4 py-1 md:py-3">STR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {standings.map((team, idx) => {
                          const prev = standings[idx - 1];
                          const separator = (() => {
                            if (team.group === "playout" && (!prev || prev.group !== "playout")) {
                              return { label: "Doigravanje za ostanak", color: "text-orange-400" };
                            }
                            if (team.group === "relegation" && (!prev || prev.group !== "relegation")) {
                              return { label: "Ispadanje", color: "text-red-400" };
                            }
                            return null;
                          })();
                          const isAlkar = team.team === "Alkar";
                          const logo = getTeamLogo(team.team);
                          const logoScale =
                            team.team === "Alkar" ? "w-[110%] h-[110%]"
                            : team.team === "Dubrava" || team.team === "Kvarner" || team.team === "Samobor" || team.team === "Zabok" ? "w-[105%] h-[105%]"
                            : team.team === "Cibona" || team.team === "Dubrovnik" ? "w-[92%] h-[92%]"
                            : "w-full h-full";
                          return (
                            <React.Fragment key={team.position}>
                              {separator && (
                                <TableRow key={`sep-${team.position}`} className="hover:bg-transparent border-border/20">
                                  <TableCell colSpan={10} className={`text-[10px] md:text-xs font-semibold py-1 md:py-1.5 px-2 md:px-4 ${separator.color}`}>
                                    <span className="inline-flex items-center gap-1.5">
                                      <span className={`w-1.5 h-1.5 rounded-full ${team.group === "playout" ? "bg-orange-400" : "bg-red-400"}`} />
                                      {separator.label}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              )}
                              <TableRow
                                key={team.position}
                                className={`border-border/20 transition-all duration-200 hover:shadow-md ${isAlkar ? "!bg-primary/30 hover:!bg-primary/40 font-bold" : "hover:bg-secondary/50"}`}
                              >
                                <TableCell className="text-center font-bold text-[10px] md:text-sm px-0.5 md:px-4 py-0.5 md:py-4">{team.position}</TableCell>
                                <TableCell className="px-0.5 md:px-4 py-0.5 md:py-4">
                                  <div className="flex items-center gap-1 md:gap-2">
                                    {logo && (
                                      <div className="w-5 h-5 md:w-8 md:h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                                        <img loading="lazy" decoding="async" src={logo} alt="" className={`object-contain ${logoScale}`} />
                                      </div>
                                    )}
                                    <span className={`text-[10px] md:text-sm font-bold ${isAlkar ? "text-primary" : ""}`}>
                                      {team.team}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4">{team.played}</TableCell>
                                <TableCell className="text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4">{team.won}</TableCell>
                                <TableCell className="text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4">{team.lost}</TableCell>
                                <TableCell className="text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4">{team.pct}</TableCell>
                                <TableCell className={`text-center text-[10px] md:text-sm font-bold px-0 md:px-4 py-0.5 md:py-4 ${team.diff > 0 ? "text-green-400" : team.diff < 0 ? "text-red-400" : ""}`}>
                                  {team.diff > 0 ? `+${team.diff}` : team.diff}
                                </TableCell>
                                <TableCell className="text-center hidden sm:table-cell">
                                  <div className="flex gap-0.5 justify-center items-center">
                                    {team.last5.map((result, i) => (
                                      <span
                                        key={i}
                                        className={`w-5 h-5 text-[10px] font-bold rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 ${
                                          result === "W" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                        }`}
                                      >
                                        {result}
                                      </span>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center font-bold text-[10px] md:text-sm px-0 md:px-4 py-0.5 md:py-4">{team.points}</TableCell>
                                <TableCell className={`text-center font-bold text-[10px] md:text-sm px-0 md:px-4 py-0.5 md:py-4 ${team.streak.startsWith("W") ? "text-green-400" : "text-red-400"}`}>{team.streak}</TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Statistics Tab */}
              <TabsContent value="statistics" className="mt-0">
                <div className="bg-secondary/30 rounded-xl border border-border/30 p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 min-h-[700px]">
                  <h3 className="font-display text-2xl md:text-3xl text-center mb-5">SAŽETAK</h3>

                  {/* Per-game summary cards (image-33) */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Postignuti poeni / utk.", value: "70.9", rank: 13, tone: "warn" },
                      { label: "Primljeni poeni / utk.", value: "78.8", rank: 3, tone: "bad" },
                      { label: "Asistencije / utk.", value: "17.1", rank: 8, tone: "warn" },
                      { label: "Omjer AST / TO", value: "1.2", rank: 7, tone: "warn" },
                    ].map((s, i) => (
                      <div key={i} className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                        <p className="text-xs md:text-sm text-muted-foreground uppercase mb-0.5">{s.label}</p>
                        <p className="text-2xl md:text-3xl font-display text-primary">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">#{s.rank}</p>
                      </div>
                    ))}
                  </div>

                  {/* Totals row (image-34) */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "Ukupno poeni", value: "2340", rank: 12 },
                      { label: "Primljeni koševi", value: "2601", rank: 2 },
                      { label: "Ukupno asistencije", value: "565", rank: 10 },
                    ].map((s, i) => (
                      <div key={i} className="bg-background/30 rounded-lg p-3 text-center border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300">
                        <p className="text-xs md:text-sm text-muted-foreground uppercase mb-0.5">{s.label}</p>
                        <p className="text-2xl md:text-3xl font-display text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">#{s.rank}</p>
                      </div>
                    ))}
                  </div>




                  {(() => {
                    const rankBadge = (rank: number) => {
                      const tone =
                        rank <= 4 ? { bg: "rgba(22,163,74,0.15)", color: "#15803d", border: "#15803d" }
                        : rank <= 8 ? { bg: "rgba(59,130,246,0.15)", color: "#1d4ed8", border: "#1d4ed8" }
                        : rank <= 10 ? { bg: "rgba(234,179,8,0.18)", color: "#a16207", border: "#a16207" }
                        : { bg: "rgba(239,68,68,0.15)", color: "#b91c1c", border: "#b91c1c" };
                      return (
                        <span className="stats-rank-badge" style={{ background: tone.bg, color: tone.color, borderColor: tone.border }}>
                          {rank}
                        </span>
                      );
                    };
                    const Row = ({ label, value, rank }: { label: string; value: string; rank: number }) => (
                      <div className="flex items-center justify-between py-1.5 border-b border-border/10 hover:bg-background/20 hover:px-1.5 transition-all duration-200 rounded">
                        <span className="text-sm md:text-base text-muted-foreground">{label}</span>
                        <div className="flex items-center gap-2 text-right">
                          <span className="text-sm md:text-base font-medium min-w-[52px] text-right">{value}</span>
                          {rankBadge(rank)}
                        </div>
                      </div>
                    );

                    return (
                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Napad */}
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                          <h4 className="font-display text-lg md:text-2xl text-center mb-3">Napad</h4>
                          <div className="space-y-1.5">
                            <Row label="Pogođeni šutovi iz igre / utk." value="26.3" rank={13} />
                            <Row label="Pokušani šutovi iz igre / utk." value="62.2" rank={12} />
                            <Row label="Šut iz igre %" value="42.3%" rank={11} />
                            <Row label="Pogođene trojke / utk." value="7.2" rank={13} />
                            <Row label="Pokušaji za 3 poena / utk." value="22.9" rank={13} />
                            <Row label="Tri poena %" value="31.6%" rank={11} />
                            <Row label="Pogođena sl. bacanja / utk." value="11.1" rank={12} />
                            <Row label="Pokušaji sl. bacanja / utk." value="16.4" rank={12} />
                            <Row label="Slobodna bacanja %" value="67.7%" rank={12} />
                          </div>
                        </div>

                        {/* Skokovi */}
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                          <h4 className="font-display text-lg md:text-2xl text-center mb-3">Skokovi</h4>
                          <div className="space-y-1.5">
                            <Row label="Skokovi u napadu / utk." value="7.9" rank={10} />
                            <Row label="Skokovi u obrani / utk." value="23.5" rank={9} />
                            <Row label="Ukupno / utk." value="34.8" rank={9} />
                            <Row label="Ukupno napadački (sezona)" value="260" rank={11} />
                            <Row label="Ukupno obrambeni (sezona)" value="777" rank={11} />
                            <Row label="Ukupno skokovi (sezona)" value="1147" rank={11} />
                          </div>
                        </div>

                        {/* Obrana */}
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                          <h4 className="font-display text-lg md:text-2xl text-center mb-3">Obrana</h4>
                          <div className="space-y-1.5">
                            <Row label="Blokirani šutovi / utk." value="2.7" rank={1} />
                            <Row label="Ukradene lopte / utk." value="7.0" rank={9} />
                            <Row label="Protivnički šut za 3 %" value="33.2%" rank={3} />
                            <Row label="Protivnički postotak šuta %" value="45.7%" rank={3} />
                            <Row label="Ukupno blokade (sezona)" value="88" rank={4} />
                            <Row label="Ukupno ukradene (sezona)" value="230" rank={10} />
                          </div>
                        </div>

                        {/* Ostalo */}
                        <div className="hover:scale-[1.01] transition-transform duration-300">
                          <h4 className="font-display text-lg md:text-2xl text-center mb-3">Ostalo</h4>
                          <div className="space-y-1.5">
                            <Row label="Izgubljene lopte / utk." value="13.9" rank={9} />
                            <Row label="Ukupno izgubljene (sezona)" value="458" rank={4} />
                            <Row label="Ukupno prekršaji (sezona)" value="656" rank={2} />
                            <Row label="Izborene osobne pogreške u napadu" value="669" rank={11} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </TabsContent>


              {/* Players Tab */}
              <TabsContent value="players" className="mt-0">
                <div className="bg-secondary/30 rounded-xl border border-border/30 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  {/* Sub-tabs */}
                  <div className="p-3 border-b border-border/30">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setActivePlayersTab("top")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          activePlayersTab === "top" 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "bg-background/30 text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                      >
                        Top igrači
                      </button>
                      <button
                        onClick={() => setActivePlayersTab("squad")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          activePlayersTab === "squad" 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "bg-background/30 text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                      >
                        Roster
                      </button>
                    </div>
                  </div>

                  {activePlayersTab === "squad" ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-border/30">
                            <TableHead className="w-10 md:w-14 text-center text-xs md:text-base font-bold">Broj</TableHead>
                            <TableHead className="w-8 md:w-14 text-xs md:text-base font-bold"></TableHead>
                            <TableHead className="text-xs md:text-base font-bold">Igrač</TableHead>
                            <TableHead className="text-center text-xs md:text-base font-bold">Nac.</TableHead>
                            <TableHead className="text-center text-sm md:text-base font-bold hidden md:table-cell">Visina</TableHead>
                            <TableHead className="text-center text-sm md:text-base font-bold hidden lg:table-cell">Datum rođenja</TableHead>
                            <TableHead className="text-center text-sm md:text-base font-bold hidden md:table-cell">Dob</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {players.map((player, index) => (
                            <TableRow key={index} className="hover:bg-secondary/50 border-border/20 transition-all duration-200 hover:shadow-md group">
                              <TableCell className="font-bold text-primary text-center text-sm md:text-base">{player.number}</TableCell>
                              <TableCell>
                                {player.sofascoreLink ? (
                                  <a 
                                    href={player.sofascoreLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                                    title="Pogledaj na SofaScore"
                                  >
                                    <ExternalLink size={12} className="md:hidden" />
                                    <ExternalLink size={14} className="hidden md:block" />
                                  </a>
                                ) : (
                                  <div className="w-6 h-6 md:w-7 md:h-7" />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 md:gap-3">
                                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary overflow-hidden group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-200 flex-shrink-0">
                                    {(player.image || playerImageMap[player.name]) ? (
                                      <img loading="lazy" decoding="async" src={player.image || playerImageMap[player.name]} alt={player.name} className="w-full h-full object-cover object-top" />
                                    ) : (
                                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                                        {player.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-bold text-sm md:text-base">{player.name}</p>
                                    <p className="text-xs md:text-sm text-primary font-medium">{player.position}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center px-1 md:px-4">
                                <div className="flex items-center justify-center gap-0.5 md:gap-1">
                                  {getFlagImage(player.nationality) ? (
                                    <img loading="lazy" decoding="async" src={getFlagImage(player.nationality)!} alt={player.nationality} className={`rounded-full object-cover flex-shrink-0 ${player.nationality === "USA" ? "w-[13.6px] h-[13.6px] md:w-[20.4px] md:h-[20.4px]" : "w-4 h-4 md:w-6 md:h-6"}`} />
                                  ) : player.nationality !== "-" ? (
                                    <span className="text-xs md:text-base">{getFlagEmoji(player.nationality)}</span>
                                  ) : null}
                                  <span className="text-[10px] md:text-base font-bold hidden sm:inline">{player.nationality}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center text-muted-foreground text-sm md:text-base font-bold hidden md:table-cell">{player.height || "-"}</TableCell>
                              <TableCell className="text-center text-muted-foreground text-sm md:text-base font-bold hidden lg:table-cell">{player.dateOfBirth || "-"}</TableCell>
                              <TableCell className="text-center text-muted-foreground text-sm md:text-base font-bold hidden md:table-cell">{player.age ? `${player.age} god.` : "-"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="p-5" style={{ zoom: 1.18 }}>
                      {/* Pagination controls */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <button 
                          onClick={() => setTopPlayersPage(0)}
                          disabled={topPlayersPage === 0}
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <span className="text-sm text-muted-foreground">
                          {topPlayersPage === 0 ? "1 - 6" : "7 - 12"} od 12
                        </span>
                        <button 
                          onClick={() => setTopPlayersPage(1)}
                          disabled={topPlayersPage === 1}
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/30 hover:scale-110 transition-all duration-200"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:gap-4">
                        {allTopCategories.slice(topPlayersPage * 6, (topPlayersPage + 1) * 6).map((category, catIndex) => (
                          <div key={catIndex} className="bg-background/20 rounded-lg p-2 md:p-3 border border-border/20 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                            <h4 className="font-display text-xs md:text-base text-center mb-2 md:mb-3 uppercase tracking-wider">{category.title}</h4>
                            <div className="space-y-1 md:space-y-2">
                              {category.data.map((player) => (
                                <div key={player.rank} className="flex items-start md:items-center gap-1 md:gap-2 hover:bg-background/30 p-1 md:p-1.5 rounded-lg transition-all duration-200 hover:scale-[1.02]">
                                  <span className="text-primary font-bold w-3 md:w-4 text-xs md:text-sm mb-0.5 md:mb-0">{player.rank}</span>
                                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-secondary overflow-hidden flex-shrink-0 mb-0.5 md:mb-0">
                                    {(player.image || playerImageMap[player.name]) ? (
                                      <img loading="lazy" decoding="async" src={player.image || playerImageMap[player.name]} alt={player.name} className="w-full h-full object-cover object-top" />
                                    ) : (
                                      <div className="w-full h-full bg-muted" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[9px] md:text-sm md:truncate leading-tight whitespace-nowrap">{player.name}</p>
                                    <p className="text-[9px] md:text-xs text-primary">{player.position}</p>
                                  </div>
                                  <span className="self-end text-sm md:text-lg font-display text-primary leading-none pb-0.5 md:pb-0">{player.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Statistics;

import type { StaticImageData } from "next/image";

import aayushKumar from "./assets/aayush-kumar.jpg";
import abrishAditya from "./assets/abrish-aditya.png";
import adityaSingh from "./assets/aditya-singh.jpeg";
import ajaySingh from "./assets/ajay-singh.png";
import ankitKumarSingh from "./assets/ankit-kumar-singh.png";
import arshiaGarg from "./assets/arshia-garg.jpg";
import arunKumarKushwaha from "./assets/arun-kumar-kushwaha.jpg";
import ashutoshSingh from "./assets/ashutosh-singh.png";
import divyanshiChoudhary from "./assets/divyanshi-choudhary.jpeg";
import divyanshuRai from "./assets/divyanshu-rai.jpeg";
import gauravKumar from "./assets/gaurav-kumar.jpg";
import gouravSingh from "./assets/gourav-singh.png";
import kavyaChauhan from "./assets/kavya-chauhan.png";
import kumariLadli from "./assets/kumari-ladli.png";
import nikhilDhariwal from "./assets/nikhil-dhariwal.png";
import nikitaKumari from "./assets/nikita-kumari.jpg";
import nishantSingh from "./assets/nishant-singh.jpg";
import pavanKumar from "./assets/pavan-kumar.jpeg";
import prikshitSharma from "./assets/prikshit-sharma.png";
import rishabhKumar from "./assets/rishabh-kumar.jpg";
import sahilKamate from "./assets/sahil-kamate.png";
import sanshey from "./assets/sanshey.jpg";
import srijanTripathi from "./assets/srijan-tripathi.jpeg";
import sumitNath from "./assets/sumit-nath.jpg";
import vigneshPandi from "./assets/vignesh-pandi.png";

export type TeamGroupName = "Leads & Domain Heads" | "Mentors" | "Alumni";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  instagram?: string;
  image: StaticImageData;
}

export interface TeamGroupDef {
  name: TeamGroupName;
  members: TeamMember[];
}

export const teamGroups: TeamGroupDef[] = [
  {
    name: "Leads & Domain Heads",
    members: [
      { slug: "nishant-singh", name: "Nishant Singh", role: "GDG Secretary", instagram: "_nishant_singhh_", image: nishantSingh },
      { slug: "divyanshi-choudhary", name: "Divyanshi Choudhary", role: "GDG Secretary", image: divyanshiChoudhary },
      { slug: "rishabh-kumar", name: "Rishabh Kumar", role: "Web Dev Lead", image: rishabhKumar },
      { slug: "sanshey", name: "Sanshey", role: "UI/UX Lead", instagram: "09_s.unshine", image: sanshey },
      { slug: "arun-kumar-kushwaha", name: "Arun Kumar Kushwaha", role: "Flutter Lead", instagram: "imwfy_a", image: arunKumarKushwaha },
      { slug: "aayush-kumar", name: "Aayush Kumar", role: "AI/ML Lead", instagram: "nomumonu", image: aayushKumar },
      { slug: "ashutosh-singh", name: "Ashutosh Singh", role: "AI/ML Lead", instagram: "ashutoshsingh058", image: ashutoshSingh },
      { slug: "pavan-kumar", name: "Pavan Kumar", role: "Cloud Lead", instagram: "pavankumar_07s", image: pavanKumar },
      { slug: "srijan-tripathi", name: "Srijan Tripathi", role: "Blockchain Lead", instagram: "sriijannn", image: srijanTripathi },
    ],
  },
  {
    name: "Mentors",
    members: [
      { slug: "arshia-garg", name: "Arshia Garg", role: "BE Mentor", instagram: "arshiaa_garg", image: arshiaGarg },
      { slug: "sumit-nath", name: "Sumit Nath", role: "BE Mentor", instagram: "sumitkumarnath7", image: sumitNath },
      { slug: "gaurav-kumar", name: "Gaurav Kumar", role: "BE Mentor", instagram: "kumar163grv", image: gauravKumar },
      { slug: "gourav-singh", name: "Gourav Singh", role: "BE Mentor", instagram: "_delusive_world_", image: gouravSingh },
      { slug: "nikhil-dhariwal", name: "Nikhil Dhariwal", role: "BE Mentor", instagram: "404nikhil_dhariwal", image: nikhilDhariwal },
      { slug: "aditya-singh", name: "Aditya Singh", role: "BE Mentor", instagram: "aditya082004", image: adityaSingh },
      { slug: "vignesh-pandi", name: "Vignesh Pandi", role: "BE Mentor", instagram: "vignesh_pandi", image: vigneshPandi },
      { slug: "divyanshu-rai", name: "Divyanshu Rai", role: "BE Mentor", instagram: "drak_sensei", image: divyanshuRai },
    ],
  },
  {
    name: "Alumni",
    members: [
      { slug: "nikita-kumari", name: "Nikita Kumari", role: "Alumni 2025", instagram: "sugarplum_1203", image: nikitaKumari },
      { slug: "ajay-singh", name: "Ajay Singh", role: "Alumni 2025", image: ajaySingh },
      { slug: "kumari-ladli", name: "Kumari Ladli", role: "Alumni 2025", image: kumariLadli },
      { slug: "kavya-chauhan", name: "Kavya Chauhan", role: "Alumni 2025", instagram: "11001_kavya", image: kavyaChauhan },
      { slug: "sahil-kamate", name: "Sahil Kamate", role: "Alumni 2025", instagram: "sahilkamate_03", image: sahilKamate },
      { slug: "abrish-aditya", name: "S B Abrish Aditya", role: "Alumni 2025", instagram: "abrish_aadi", image: abrishAditya },
      { slug: "prikshit-sharma", name: "Prikshit Sharma", role: "Alumni 2025", instagram: "prikshi.t", image: prikshitSharma },
      { slug: "ankit-kumar-singh", name: "Ankit Kumar Singh", role: "Alumni 2025", instagram: "ankit_ya_i_am", image: ankitKumarSingh },
    ],
  },
];

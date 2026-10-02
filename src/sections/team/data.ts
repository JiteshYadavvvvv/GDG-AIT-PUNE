import type { StaticImageData } from "next/image";

import aayushKumar from "./assets/aayush-kumar.jpg";
import adityaSingh from "./assets/aditya-singh.jpeg";
import arshiaGarg from "./assets/arshia-garg.jpg";
import arunKumarKushwaha from "./assets/arun-kumar-kushwaha.jpg";
import ashutoshSingh from "./assets/ashutosh-singh.png";
import divyanshiChoudhary from "./assets/divyanshi-choudhary.jpeg";
import divyanshuRai from "./assets/divyanshu-rai.jpeg";
import gauravKumar from "./assets/gaurav-kumar.jpg";
import gouravSingh from "./assets/gourav-singh.png";
import nikhilDhariwal from "./assets/nikhil-dhariwal.png";
import nishantSingh from "./assets/nishant-singh.jpg";
import pavanKumar from "./assets/pavan-kumar.jpeg";
import rishabhKumar from "./assets/rishabh-kumar.jpg";
import sanshey from "./assets/sanshey.jpg";
import srijanTripathi from "./assets/srijan-tripathi.jpeg";
import sumitNath from "./assets/sumit-nath.jpg";
import vigneshPandi from "./assets/vignesh-pandi.png";

export type TeamGroupName = "Facilitators" | "Leads & Domain Heads" | "Mentors" | "Alumni";

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
    name: "Facilitators",
    members: [
      { slug: "nishant-singh", name: "Nishant Singh", role: "Web Dev Facilitator", instagram: "_nishant_singhh_", image: nishantSingh },
      { slug: "divyanshi-choudhary", name: "Divyanshi Choudhary", role: "Web Dev Facilitator", image: divyanshiChoudhary },
      { slug: "rishabh-kumar", name: "Rishabh Kumar", role: "Web Dev Facilitator", image: rishabhKumar },
      { slug: "sanshey", name: "Sanshey", role: "UI/UX Facilitator", instagram: "09_s.unshine", image: sanshey },
      { slug: "arun-kumar-kushwaha", name: "Arun Kumar Kushwaha", role: "Flutter Facilitator", instagram: "imwfy_a", image: arunKumarKushwaha },
      { slug: "aayush-kumar", name: "Aayush Kumar", role: "AI/ML Facilitator", instagram: "nomumonu", image: aayushKumar },
      { slug: "ashutosh-singh", name: "Ashutosh Singh", role: "AI/ML Facilitator", instagram: "ashutoshsingh058", image: ashutoshSingh },
      { slug: "pavan-kumar", name: "Pavan Kumar", role: "Cloud Facilitator", instagram: "pavankumar_07s", image: pavanKumar },
      { slug: "srijan-tripathi", name: "Srijan Tripathi", role: "Blockchain Facilitator", instagram: "sriijannn", image: srijanTripathi },
    ],
  },
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
      { slug: "nishant-singh", name: "Nishant Singh", role: "BE Mentor", instagram: "_nishant_singhh_", image: nishantSingh },
      { slug: "divyanshi-choudhary", name: "Divyanshi Choudhary", role: "BE Mentor", image: divyanshiChoudhary },
      { slug: "rishabh-kumar", name: "Rishabh Kumar", role: "BE Mentor", image: rishabhKumar },
      { slug: "sanshey", name: "Sanshey", role: "BE Mentor", instagram: "09_s.unshine", image: sanshey },
      { slug: "arun-kumar-kushwaha", name: "Arun Kumar Kushwaha", role: "BE Mentor", instagram: "imwfy_a", image: arunKumarKushwaha },
      { slug: "aayush-kumar", name: "Aayush Kumar", role: "BE Mentor", instagram: "nomumonu", image: aayushKumar },
      { slug: "ashutosh-singh", name: "Ashutosh Singh", role: "BE Mentor", instagram: "ashutoshsingh058", image: ashutoshSingh },
      { slug: "pavan-kumar", name: "Pavan Kumar", role: "BE Mentor", instagram: "pavankumar_07s", image: pavanKumar },
      { slug: "srijan-tripathi", name: "Srijan Tripathi", role: "BE Mentor", instagram: "sriijannn", image: srijanTripathi },
    ],
  },
  {
    name: "Alumni",
    members: [
      { slug: "arshia-garg", name: "Arshia Garg", role: "Alumini 2k26", instagram: "arshiaa_garg", image: arshiaGarg },
      { slug: "sumit-nath", name: "Sumit Nath", role: "Alumini 2k26", instagram: "sumitkumarnath7", image: sumitNath },
      { slug: "gaurav-kumar", name: "Gaurav Kumar", role: "Alumini 2k26", instagram: "kumar163grv", image: gauravKumar },
      { slug: "gourav-singh", name: "Gourav Singh", role: "Alumini 2k26", instagram: "_delusive_world_", image: gouravSingh },
      { slug: "nikhil-dhariwal", name: "Nikhil Dhariwal", role: "Alumini 2k26", instagram: "404nikhil_dhariwal", image: nikhilDhariwal },
      { slug: "aditya-singh", name: "Aditya Singh", role: "Alumini 2k26", instagram: "aditya082004", image: adityaSingh },
      { slug: "vignesh-pandi", name: "Vignesh Pandi", role: "Alumini 2k26", instagram: "vignesh_pandi", image: vigneshPandi },
      { slug: "divyanshu-rai", name: "Divyanshu Rai", role: "Alumini 2k26", instagram: "drak_sensei", image: divyanshuRai },
    ],
  },
];

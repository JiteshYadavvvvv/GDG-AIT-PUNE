"use client";

import { useState } from "react";

import { accents } from "@/config/brand";

import { teamGroups, type TeamGroupName } from "./data";
import { TeamCard } from "./team-card";
import { TeamTabs } from "./team-tabs";

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];
const DEFAULT_GROUP: TeamGroupName = "Leads & Domain Heads";

export function TeamGallery() {
  const [selected, setSelected] = useState<TeamGroupName>(DEFAULT_GROUP);
  const group = teamGroups.find((item) => item.name === selected) ?? teamGroups[0]!;

  return (
    <div>
      <TeamTabs groups={teamGroups.map((item) => item.name)} selected={selected} onSelect={setSelected} accent="green" />

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
        {group.members.map((member, index) => (
          <TeamCard
            key={member.slug}
            member={member}
            accent={accents[index % accents.length]!}
            delay={(index % 8) * 0.06}
            rotation={ROTATIONS[index % ROTATIONS.length]}
          />
        ))}
      </div>
    </div>
  );
}

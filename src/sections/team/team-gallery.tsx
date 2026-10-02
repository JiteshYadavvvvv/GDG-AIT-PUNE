"use client";

import { useState } from "react";

import { accents } from "@/config/brand";

import { teamGroups, type TeamGroupName } from "./data";
import { TeamCard } from "./team-card";
import { TeamTabs } from "./team-tabs";

const ROTATIONS = [-0.75, 0.5, -0.5, 0.75, -0.5, 0.5];
const DEFAULT_GROUP: TeamGroupName = "Leads & Domain Heads";

export function TeamGallery() {
  const [selected, setSelected] = useState<TeamGroupName>(DEFAULT_GROUP);
  const group = teamGroups.find((item) => item.name === selected) ?? teamGroups[0]!;

  return (
    <div>
      <TeamTabs groups={teamGroups.map((item) => item.name)} selected={selected} onSelect={setSelected} accent="green" />

      <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-14 lg:gap-x-10">
        {group.members.map((member, index) => (
          <TeamCard
            key={member.slug}
            member={member}
            accent={accents[index % accents.length]!}
            delay={(index % 8) * 0.06}
            rotation={ROTATIONS[index % ROTATIONS.length]}
            className="w-full shrink-0 sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.667rem)]"
          />
        ))}
      </div>
    </div>
  );
}

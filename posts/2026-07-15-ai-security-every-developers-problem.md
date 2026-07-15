---
title: "AI is Making Security Every Developer's Problem"
date: "2026-07-15"
link:
  title: Building for Breach
  url: "https://www.resilientcyber.io/p/building-for-breach"
  author: Chris Hughes
---

For most of my career, security has been in a silo. There was a dedicated team that handled the firewalls and audits while the rest of us shipped features. But [Chris Hughes' recent article "Building for Breach"](https://www.resilientcyber.io/p/building-for-breach) makes a convincing case that this is ending, and security is another factor all developers must consider. It’s not because attacks suddenly got smarter. It’s because AI has accelerated the speed, power, and success rates of security threats. **It’s no longer a matter of “if” there will be a breach, but “when.”**

I recommend reading the entire article, but here are the biggest takeaways I found.

## Threats Now Outpace Defenses

AI turned vulnerability hunting into a cheap, automated search problem. Over 40,000 Common Vulnerabilities and Exposures (or CVEs) were published in 2025, but 2026 projections range from 60,000 to 100,000.

Defenders can't simply patch faster to keep up, because writing the fix is only 10–15% of the solution. The rest is impact assessment, cross-team coordination, testing, and deployment windows, which need work from more than just security experts. So it falls on everyone to help fill the remaining 85-90%.

What’s happening while companies try to bridge that gap? Attackers need an average of 29 minutes to "break out" of their first compromised system into the rest of the environment. Some basic mental math shows that virtually no company’s defenses can systemically keep up with these new threats.

**The core question has shifted from "how do we prevent breaches" to "how do we survive the breaches that will inevitably happen?"**

## Three Terms Worth Knowing

This shift comes with vocabulary you'll be hearing a lot more:

- **Lateral movement** is an attacker hopping from the first compromised system to everything connected to it. It's rarely noisy — over 80% of intrusions now use valid stolen credentials. Attackers log in rather than hack in, and no alarms go off.
- **Microsegmentation** is the fix for the above. Think hotel keycards: a flat network is a hotel where every card opens every door. Microsegmentation issues each service a card that only opens the doors it genuinely needs.
- **Blast radius** is everything a single compromise can reach. It's the one security variable determined entirely by design decisions made *before* an incident happens.

**All these belong to developers, not just the security team.**

## The Cloud Traded Walls for Convenience

On-premises environments had overlapping defenses: perimeter firewalls, internal zones, real network separation. Cloud platforms like AWS have made system infrastructure fast and convenient to set up and scale.

**But the tradeoff of this convenience is that all those defensive layers collapsed into a single pillar: the login itself.** Cloud identity is strong, but it’s the only wall left standing. One compromised login can be enough to reach *everything*, making the blast radius your entire cloud account — and "everything" is now where companies keep their most valuable data. This is especially dangerous for spheres like fintech, healthcare, and public or civic tech, where compromised personal data can cause true catastrophes.

## Architecture Is Now A Major Security Layer

Here's the part I find most compelling as a developer: **perfectly written code deployed into a flat, over-permissioned environment is still insecure.** The architecture around the code determines the damage, not the code itself. Some everyday causes and fixes:

- A service that can read every database "just in case." When it's compromised, so is everything it touches. Each service should only access what it actually needs.
- Unrestricted egress, or letting outbound traffic leave anywhere without restriction. A compromised workload can quietly ship sensitive data anywhere on the internet. Allowlists that explicitly declare where outbound traffic can go resolve this.

Neither of these are patches. They’re the kinds of design decisions developers and architects make every sprint. We now need to see how they’re also security decisions.

## Resilience Over Prevention

The main focus used to be prevention to reduce the chances of a breach. But the focus is shifting to detection for reducing how long a hacker can attack, and containment to reduce the damage. These need to be built into the architecture so they work even when the vulnerability is unpatched, and an AI agent is attacking it at 3:00 AM.

The goal isn't a perfect wall anymore. **It's changing the security report from "here's how we prevented it" to "here's how we contained it."** In today’s changing, AI-fueled landscape, the former is becoming a promise nobody can keep.
-- Commonplace import: reading notes
-- Paste into Supabase > SQL Editor > New query, then Run.
-- Safe to run twice: a source whose title is already in your library is skipped.

do $$
declare
  uid uuid;
  sid uuid;
begin
  -- Your account (the app has one user)
  select id into uid from auth.users order by created_at limit 1;
  if uid is null then raise exception 'No user found. Create your login first.'; end if;

  -- Magnet, Shoshana; Rodgers, Tara: Stripping for the State (15 quotes)
  if not exists (select 1 from public.sources where title = $t$Stripping for the State$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Stripping for the State$t$, $t$Magnet, Shoshana; Rodgers, Tara$t$,
      $t${"subtitle": "Whole Body Imaging Technologies and the Surveillance of Othered Bodies", "publication": "Feminist Media Studies", "volume": "12", "issue": "1", "date": "2012", "pages": "101–118", "doi": "10.1080/14680777.2011.558352"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Using new ways of visualizing the body, individuals are increasingly linked through their bodies into networks as part of what Simone Browne (2009) calls the “identity–industrial complex,” in which the body itself becomes the primary object of surveillance.$t$, $t$102$t$, array['highlighted', 'borders', 'biometrics']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Using Angela Y. Davis’ (2003) theory of the strip search as a form of state-sponsored sexual assault, we complicate assertions that using whole body imaging technologies to subject travelers to a “virtual strip search” is unproblematic.$t$, $t$102$t$, array['highlighted', 'borders', 'biometrics', 'privacy']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Moreover, the alleged non-invasiveness and efficiency of the “virtual strip search,” compared to the physical contact involved in a pat-down, represents a troubling trend in which the state consolidates its power through increasingly covert and concealed surveillance practices.$t$, $t$102$t$, array['highlighted', 'borders', 'biometrics', 'privacy']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The “freedom of movement” historically associated with air travel is always entwined with the generation and movement of capital.$t$, $t$104$t$, array['highlighted', 'borders', 'biometrics', 'surveillance-capitalism']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In the middle of the cold beauty of this airport passengers have to face their terrible truth: they are alone, in the middle of the space of flows, they may lose their connection, they are suspended in the emptiness of the transition . . . and there is no escape.$t$, $t$105$t$, array['highlighted', 'borders', 'biometrics']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The passenger has the option of receiving a full pat down or going through the Whole Body Imaging system.$t$, $t$110$t$, array['highlighted', 'borders', 'biometrics']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$We live in a virtual world, it is said, where bodies no longer matter. Yet the material body is central to modern forms of power and thus also key to state policies, borders, media, and technologies.$t$, $t$101–102$t$, array['borders', 'biometrics']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Rather than rehashing arguments as to whether or not surveillance keeps the state safe, we are instead drawing on feminist theories of intersectionality to illuminate what constitutes surveillance, who is scrutinized, why, and at what cost.$t$, $t$103$t$, array['borders', 'biometrics']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Put simply, when airports are represented as “nowhere architecture,” it becomes difficult to critique and resist the state’s strategic operations within these spaces.$t$, $t$105$t$, array['borders', 'biometrics', 'resistance']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Testing a new technology on a vulnerable population who cannot refuse, like prisoners, is a well-traveled path in the introduction of new security technologies.$t$, $t$108$t$, array['borders', 'biometrics']::text[], now() - interval '9 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Here, we see how the need for a strip search is naturalized as the question becomes, instead of “Why must I submit to a strip search?” a matter of “What kind of strip search would I prefer?”$t$, $t$110$t$, array['borders', 'biometrics', 'privacy']::text[], now() - interval '10 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Ultimately, one may “opt out” of passing through a body scanner (Sara J. Welch 2010), but not out of the increasingly invasive and pervasive surveillance practices themselves, unless one relinquishes the right to air travel.$t$, $t$110$t$, array['borders', 'biometrics']::text[], now() - interval '11 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In this way, these technologies serve as disciplining technologies designed to produce “properly” gendered bodies.$t$, $t$111$t$, array['borders', 'biometrics', 'gender']::text[], now() - interval '12 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Suggesting that a virtual strip search is preferable to a real life search works to prevent us from asking why travelers are being searched in these invasive ways.$t$, $t$113$t$, array['borders', 'biometrics', 'privacy']::text[], now() - interval '13 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Virtual strip searches and pat-downs may also be considered as new extensions of stop-and-frisk methods that disproportionately affect communities of color in the US.$t$, $t$113$t$, array['borders', 'biometrics', 'race', 'policing']::text[], now() - interval '14 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Body scanners are sold as neutral and less invasive than pat-downs. The authors argue they reproduce existing inequality.
• Air travel has always sorted who moves freely, by class, race, and gender. Scanners continue that pattern.
• Following Angela Davis, the "virtual strip search" is treated as a form of state violence, not just a privacy issue.
• Transgender, disabled, fat, Muslim, and racialized travelers bear the heaviest costs: being outed, exposed, humiliated, or detained.
• Offering "scanner or pat-down" frames surveillance as consumer choice and hides the question of why the search happens at all.
• Because the scanning is hidden and touchless, state power expands while becoming harder to see and resist.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Whole body imaging technology: the TSA's "umbrella term . . . to describe technologies that enable TSA to detect prohibited items including weapons, explosives and other metallic and non-metallic threat items concealed under layers of clothing without physical contact." (102)
• Identity–industrial complex (Browne): a system "in which the body itself becomes the primary object of surveillance." (102)
• Surveillant scopophilia: "new technologies provide opportunities for pleasure in looking in ways connected to their surveillance." (103)
• Architecture of nudity (Castells): an airport design that "exposes contemporary travelers’ fear and anxiety as they move within the space of flows." (105)
• Aesthetic of transparency (Rachel Hall): the state's reliance on a "rationality of government that understands security in terms of visibility." (105–106)
• Code/space (Dodge and Kitchin): "air travel as a discursive network that connects such nodes as travel websites, airport check-in and security checkpoints, air traffic control, flight decks, and customs and immigration checkpoints." (106)
• Backscatter X-rays: "body scanners that, unlike the regular dual-energy X-ray systems predominantly in use at airports, are able to produce clear images of organic materials." (108)
• Mechanical objectivity (Daston and Galison): objectivity "imagined to be achieved through the replacement of “subjective” human judgment with “objective” computer vision." (109)
• Stratified mobilities: air travel "resulting in eased mobility for some while constraining the movement of others." (114)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “Using new ways of visualizing the body, individuals are increasingly l…” (102): You highlighted the phrase only. I gave the full sentence. The term is Browne's.
• “In the middle of the cold beauty of this airport passengers have to fa…” (105): These are Manuel Castells' words, quoted secondhand from Gottdiener 2000, p. 70. Cite as "Castells, quoted in Magnet and Rodgers."
• “The passenger has the option of receiving a full pat down or going thr…” (110): A TSA statement, which the authors quote via the National Center for Transgender Equality (2009).$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Stripping for the State$t$;
  end if;

  -- Gomez, Sofia: The Dangers of Militarizing Racist Facial Recognition Technology (8 quotes)
  if not exists (select 1 from public.sources where title = $t$The Dangers of Militarizing Racist Facial Recognition Technology$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$The Dangers of Militarizing Racist Facial Recognition Technology$t$, $t$Gomez, Sofia$t$,
      $t${"publication": "Georgetown Security Studies Review", "date": "2020-09-30", "url": "https://georgetownsecuritystudiesreview.org/2020/09/30/the-dangers-of-militarizing-racist-facial-recognition-technology/"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Nearly a century ago, British eugenicist Francis Galton attempted to do the same thing, but was unable to distinguish a precise criminal “type.”$t$, '', array['highlighted', 'biometrics', 'military', 'race', 'policing']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In this arena, ethics regulations and supervision must come before and during implementation, not after misuse comes to light.$t$, '', array['biometrics', 'military']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Lantern laws, for example, demanded that Black people carry lanterns with them at night when walking alone, so that they could be easily identified and surveilled by white people.$t$, '', array['biometrics', 'military', 'race']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$For Black people, surveillance ain’t safety.$t$, '', array['biometrics', 'military', 'race']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The “perfection” or refinement of algorithms cannot address the racism and bias inherent with when and how such systems are put to use.$t$, '', array['biometrics', 'military', 'race']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Keen to be on the cutting edge, the DoD has a history of developing and implementing new technology on the battlefield without examining the ethical implications of its use.$t$, '', array['biometrics', 'military']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Military officials often frame discussions of new technologies as part of a battle for strategic dominance, a dangerous tendency that binds high-speed technological advancement to national security.$t$, '', array['biometrics', 'military']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The military, with its history of ignoring ethics issues in favor of pursuing technological supremacy on the battlefield, cannot be trusted to protect the liberties and identities of civilians overseas.$t$, '', array['biometrics', 'military']::text[], now() - interval '7 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Facial recognition misidentifies Black, Indigenous, and people of color, women, and children more often. This has already led to wrongful arrests in the US.
• Better accuracy won't fix it. The deeper problem is a long history of surveillance used to control Black people.
• Police use is getting scrutiny and bans, but the military's growing use is getting almost none.
• The Pentagon has a track record of adopting new technology before thinking about ethics, including napalm and drones.
• Gomez's recommendations: more military transparency, congressional oversight, pressure from tech employees, and a temporary moratorium on military use.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• BIPOC: "Black, Indigenous, and people of color." (Introduction)
• Lantern laws: laws that "demanded that Black people carry lanterns with them at night when walking alone, so that they could be easily identified and surveilled by white people." (Problems with Facial Recognition)
• Faception classifiers: the company "uses facial images to create individual personality scorecards using eight different personality types or “classifiers.”" (Problems with Facial Recognition)
• VICE: "the Army’s Video Identification, Collection, and Exploitation (VICE) software to broadly identify individuals who might threaten Department of Defense (DoD) missions." (How the Military Uses Facial Recognition)
• Automated Biometric Information System: a system that "houses some 7.4 million biometric profiles of people who have crossed paths with the US military abroad." (How the Military Uses Facial Recognition)
• Project Maven: "a DoD initiative to use artificial intelligence (AI) technology in drone footage analysis." (Technological Innovation Trumps Ethics)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “Nearly a century ago, British eugenicist Francis Galton attempted to d…” (Problems with Facial Recognition): "The same thing" refers to Harrisburg University researchers who claimed software could "predict criminality based solely on a facial image."
• “For Black people, surveillance ain’t safety.…” (Problems with Facial Recognition): Tawana Petty, quoted by Gomez.
• Web article: quotes have no page numbers, since Chicago doesn’t use them for web sources. Locations: “Nearly a century ago, British eugenicist…” → Problems with Facial Recognition; “In this arena, ethics regulations and su…” → Introduction; “Lantern laws, for example, demanded that…” → Problems with Facial Recognition; “For Black people, surveillance ain’t saf…” → Problems with Facial Recognition; “The “perfection” or refinement of algori…” → Problems with Facial Recognition; “Keen to be on the cutting edge, the DoD …” → Technological Innovation Trumps Ethics; “Military officials often frame discussio…” → Technological Innovation Trumps Ethics; “The military, with its history of ignori…” → The Way Forward$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$The Dangers of Militarizing Racist Facial Recognition Technology$t$;
  end if;

  -- Sankin, Aaron: Your Medical Data Is for Sale, and There’s Nothing You Can Do About It (10 quotes)
  if not exists (select 1 from public.sources where title = $t$Your Medical Data Is for Sale, and There’s Nothing You Can Do About It$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Your Medical Data Is for Sale, and There’s Nothing You Can Do About It$t$, $t$Sankin, Aaron$t$,
      $t${"publication": "Reveal (The Center for Investigative Reporting)", "date": "2017-01-20"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Even though this type of sale is in full compliance with the law, there was a feeling that if people knew about this, they would be kind of creeped out.$t$, '', array['highlighted', 'medical-data', 'surveillance-capitalism', 'chilling-effects']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Stuff that seems very innocent, such as what cable television package you subscribe to, if you have all the channels, can be matched with what clothing size you wear and what food you buy. They may determine that you’re a big fat guy sitting around on the couch all day; maybe you’re not in all that great health. There are a lot of things that are not even directly medical data that could be very sensitive and it could lead to discrimination in some form. It could lead to a life insurance company saying, “You’re a bad risk; we don’t want to give you life insurance.” That’s something life insurers can do.$t$, '', array['highlighted', 'medical-data', 'surveillance-capitalism']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Medical data is even more personal, more intimate and potentially damaging.$t$, '', array['medical-data', 'surveillance-capitalism', 'privacy']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$If you subscribe to a magazine about diabetes, that mailing list may be sold, and you may be identified as someone likely to have that ailment. They can sell that without any restriction under U.S. law.$t$, '', array['medical-data', 'surveillance-capitalism']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$When I say anonymized, I should stress that it’s anonymized of the patient’s name, but the doctor’s name is still in it.$t$, '', array['medical-data', 'surveillance-capitalism']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Is this something that we as a society are comfortable having happen without really much public debate?$t$, '', array['medical-data', 'surveillance-capitalism']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Everyone in this trade is happy, except for the patients, who don’t really know about it.$t$, '', array['medical-data', 'surveillance-capitalism']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The greatest potential harm is that, as people realize this trade is going on, they may be more wary about revealing their most intimate problems with their health care providers.$t$, '', array['medical-data', 'surveillance-capitalism', 'privacy', 'chilling-effects']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$There should be a new definition that says medical data is data about you and your medical issues, whether or not it’s identified.$t$, '', array['medical-data', 'surveillance-capitalism']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$I think the best approach would probably be to redefine the rules on a national level, so I wouldn’t put the responsibility on the individual.$t$, '', array['medical-data', 'surveillance-capitalism', 'responsibility']::text[], now() - interval '9 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Nearly every medical interaction (doctor visits, prescriptions, lab tests, insurance claims) is recorded and sold.
• "Anonymized" data has the patient's name removed but keeps the doctor's. Drug companies use it to target doctors with sales pitches.
• Identifiable health profiles are built from non-medical data like magazine subscriptions, apps, and purchases, which US health privacy law doesn't cover.
• The main risk Tanner sees is patients holding back from their doctors once they learn about the trade. Discrimination by insurers is another.
• Opting out is close to impossible for one person. Tanner wants medical data redefined at the national level to include anonymized data.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Anonymized data: data "without your name, Social Security number or address," though "the doctor’s name is still in it." (PDF 2–3)
• Identifiable data: data sold "about you that does not have that anonymization." (PDF 2)
• HIPAA: the Health Insurance Portability and Accountability Act, which "allows for the transfer of medical data from one place to the other." (PDF 3)
• Health data paradox: "You, as a patient, want your doctor and any other people giving you health care to be able to access your full records," yet "we don’t really have access to our own comprehensive medical records." (PDF 4)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “Even though this type of sale is in full compliance with the law, ther…” (PDF 3): This is the interviewer speaking, not Tanner. Attribute it to Reveal or Sankin.
• Web article: quotes have no page numbers, since Chicago doesn’t use them for web sources. Locations: “Even though this type of sale is in full…” → PDF 3; “Stuff that seems very innocent, such as …” → PDF 5, Tanner; “Medical data is even more personal, more…” → PDF 2, Tanner; “If you subscribe to a magazine about dia…” → PDF 2, Tanner; “When I say anonymized, I should stress t…” → PDF 3, Tanner; “Is this something that we as a society a…” → PDF 3, Tanner; “Everyone in this trade is happy, except …” → PDF 4, Tanner; “The greatest potential harm is that, as …” → PDF 4, Tanner; “There should be a new definition that sa…” → PDF 5, Tanner; “I think the best approach would probably…” → PDF 6, Tanner$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Your Medical Data Is for Sale, and There’s Nothing You Can Do About It$t$;
  end if;

  -- Welsh, Talia: Feminist Existentialism, Biopolitics, and Critical Phenomenology in a Time of Bad Health (12 quotes)
  if not exists (select 1 from public.sources where title = $t$Feminist Existentialism, Biopolitics, and Critical Phenomenology in a Time of Bad Health$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'book', $t$Feminist Existentialism, Biopolitics, and Critical Phenomenology in a Time of Bad Health$t$, $t$Welsh, Talia$t$,
      $t${"publisher": "Routledge", "year": "2022", "shortTitle": "Biopolitics and Personal Responsibility"}$t$::jsonb,
      $t${"bibliography": "Welsh, Talia. “Biopolitics and Personal Responsibility.” In *Feminist Existentialism, Biopolitics, and Critical Phenomenology in a Time of Bad Health*, 78–102. Routledge, 2022. https://doi.org/10.4324/9781003168676-4.", "note": "Talia Welsh, “Biopolitics and Personal Responsibility,” in *Feminist Existentialism, Biopolitics, and Critical Phenomenology in a Time of Bad Health* (Routledge, 2022).", "short": "Welsh, “Biopolitics and Personal Responsibility.”"}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Visible responsible parenting takes ideological precedence over invisible reproductive labor.$t$, $t$78$t$, array['biopolitics', 'responsibility']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Conformity is based not in a conscious obedience, but in blindness to disciplinary regimes.$t$, $t$80$t$, array['biopolitics']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$It isn’t just normalizing—it is normal.$t$, $t$80$t$, array['biopolitics']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Normalization in the case of health should be understood not as producing identical bodies—which is, as of yet, impossible—but producing the right kind of identity in relation to one’s body.$t$, $t$82$t$, array['biopolitics']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$If wealth and health are perceived to be gifts of birth, then one can’t really encourage normalization. Rather they must be achievable states that everybody can work toward.$t$, $t$82$t$, array['biopolitics']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$“The judges of normality are everywhere,” Foucault writes—from the person on the street to your face in the mirror that judges if you have succeeded or failed.$t$, $t$83$t$, array['biopolitics']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Preventable deaths and illnesses are not in principle problems. They rise to the status of being problems only if they threaten the neoliberal capitalist development and well-being of those who are its main beneficiaries.$t$, $t$86$t$, array['biopolitics', 'surveillance-capitalism']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The relative lack of an apparatus to support alleviating poverty and the increasingly robust one to promote health demonstrates how discriminatory power can be present even with everyone having the very best intentions.$t$, $t$93$t$, array['biopolitics']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$To judge someone based on her or his health, or perceived health, is simply normal, and to hate oneself for one’s fatness or bad health is much more common than to hate oneself for one’s lack of commitment to improving the condition of the least fortunate.$t$, $t$93$t$, array['biopolitics']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In biopolitical regimes the management of life is not the promotion of life—it is about management. Lives are simply to be managed or left to die as needed.$t$, $t$94$t$, array['biopolitics']::text[], now() - interval '9 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Race, social class, and environment fade out of any kind of analysis if the target is the individual’s freedom and responsibility.$t$, $t$95$t$, array['biopolitics', 'responsibility']::text[], now() - interval '10 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$If it is parents who are responsible, then structural issues such as the larger social, economic, and political world are less important.$t$, $t$95$t$, array['biopolitics', 'responsibility']::text[], now() - interval '11 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Chapter 4, “Biopolitics and Personal Responsibility,” pp. 78–102

Summary
• Using Foucault, Welsh argues that the push to be healthy is a way of managing populations, not just personal self-improvement.
• Discipline works because it feels normal and like a free choice. People compare themselves to others instead of seeing the system.
• Childhood obesity campaigns (shaming billboards, weight report cards, removing children from homes) make health part of what counts as a "good parent."
• Placing responsibility on parents pushes structural causes like poverty and racism out of view.
• A strong "apparatus" exists around health but not around poverty, which shows whose problems society chooses to organize around.
• COVID-19 is her example: personal-responsibility thinking let preventable deaths, falling hardest on Black, poor, elderly, and disabled people, count as acceptable.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Biopolitics: a field whose "common thread is understanding the connection between scientific/social interests in life and political/economic interests." (78) Foucault's version: it "deals with the population, with the population as a political problem." (85)
• Discipline (Foucault): "how we are trained, without explicit force, to control our bodies in routine and precise ways." (79)
• Subjectivation (Lemke): "the manner in which subjects are brought to work on themselves, guided by scientific, medical, moral, religious, and other authorities." (84)
• Endemics (Foucault): "illnesses that were difficult to eradicate that “sapped the population’s strength, shortened the working week, wasted energy, and cost money.”" (85)
• Security mechanisms (Foucault): regulatory mechanisms "designed to produce regularized populations." (85)
• Apparatus (Foucault): "a thoroughly heterogeneous ensemble consisting of discourses, institutions, architectural forms, regulatory decisions, laws, administrative measures, scientific statements, philosophical, moral and philanthropic propositions." (89)
• Problematization (Foucault): "the development of a domain of acts, practices, and thoughts that seem to me to pose problems for politics." (91)
• Good health imperative: defined in an earlier chapter. Here: "a certain kind of attitude and accompanying behavior toward one’s health as universally imperative." (92)
• Epistemology of ignorance (Alcoff): "of refusal to understand, accept, or even engage with public health recommendations." (94–95)
• Transformation problem (Vogelmann): "how does one turn the capacity to work into real work?" (97)$t$, now() - interval '1 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Feminist Existentialism, Biopolitics, and Critical Phenomenology in a Time of Bad Health$t$;
  end if;

  -- Mann, Steve; Nolan, Jason; Wellman, Barry: Sousveillance (10 quotes)
  if not exists (select 1 from public.sources where title = $t$Sousveillance$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Sousveillance$t$, $t$Mann, Steve; Nolan, Jason; Wellman, Barry$t$,
      $t${"subtitle": "Inventing and Using Wearable Computing Devices for Data Collection in Surveillance Environments", "publication": "Surveillance & Society", "volume": "1", "issue": "3", "date": "2003", "pages": "331–355"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$One way to challenge and problematize both surveillance and acquiescence to it is to resituate these technologies of control on individuals, offering panoptic technologies to help them observe those in authority. We call this inverse panopticon “sousveillance” from the French words for “sous” (below) and “veiller” to watch.$t$, $t$332$t$, array['sousveillance']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Sousveillance focuses on enhancing the ability of people to access and collect data about their surveillance and to neutralize surveillance.$t$, $t$333$t$, array['sousveillance']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$By contrast, reflectionism seeks to increase the equality between surveiller and the person being surveilled (surveillee), including enabling the surveillee to surveil the surveiller.$t$, $t$333$t$, array['sousveillance']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Yet, the asymmetrical nature of surveillance is characteristic of an unbalanced power relationship.$t$, $t$334$t$, array['sousveillance']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Therefore, the more highly surveilled a space is, the more objections are raised about such sousveillance, regardless of whether the content displayed is satirical or advertising in nature.$t$, $t$340$t$, array['sousveillance']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The greater the appearance that the sousveiller has personal control over the device, the less acceptable the act of sousveillance becomes.$t$, $t$341$t$, array['sousveillance']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Surveillance is a silly game of make-believe, like we can pretend we are not involved in the game (as the audience), but in fact we are the other team. Sousveillance is honest and factual, where the audience is aware of their part because we all become the audience.$t$, $t$344$t$, array['sousveillance']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$It becomes impossible to isolate and identify a specific responsible entity; responsibility defuses into generalized deferrals to the way things are.$t$, $t$346$t$, array['sousveillance', 'responsibility']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Yet, the ubiquitous total surveillance that sousveillance now affords is an ultimate act of acquiescence on the part of the individual. Universal surveillance/sousveillance may, in the end, only serve the ends of the existing dominant power structure.$t$, $t$347$t$, array['sousveillance']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In affording all people to be simultaneously master and subject of the gaze, wearable computing devices offer a new voice in the usually one-sided dialogue of surveillance.$t$, $t$348$t$, array['sousveillance', 'visibility']::text[], now() - interval '9 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• This is the founding article on sousveillance: ordinary people using wearable cameras to watch the institutions that watch them.
• The authors staged five public performances in Toronto shops, malls, and streets using wearable cameras, projectors, and fake surveillance domes.
• The public accepted being filmed by peers, and even by things that looked corporate. Store staff objected to being filmed back, especially in heavily surveilled places like casinos and jewelry stores.
• Objections faded when the wearer seemed not to be in control of the device, as if "just following orders," which mirrors how surveillance workers defer to policy.
• They see sousveillance as restoring balance and opening dialogue, but warn that universal sur/sousveillance could end up serving existing power.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Sousveillance: an "inverse panopticon," named "from the French words for “sous” (below) and “veiller” to watch." (332)
• Reflectionism: "a philosophy and procedures of using technology to mirror and confront bureaucratic organizations." (333)
• Détournement: "the tactic of appropriating tools of social controllers and resituating these tools in a disorienting manner." (333)
• Panopticon (Bentham): "a system of observation in which people could be placed under the possibility of surveillance without knowing whether they were actually being watched." (334)
• Neo-panopticons: in these, "those subject to neo-panopticons do not have direct visual and aural contact with those who are observing." (335)
• Coveillance: observation "that is side-to-side," such as "one citizen watching another." (338)
• Privacy vs. solitude: "privacy (the right to be free of the effects of measuring instruments such as cameras)" versus "solitude (the right to be free of the effects of output devices such as video displays)." (344)
• "Will not/may not/cannot" hierarchy: "when the sousveiller refuses (will not) to stop taking pictures, the situation escalates, whereas when the wearer is contractually required to take pictures (may not) the situation remains neutral, and when the wearer is unable to stop taking pictures (cannot) the situation usually becomes acceptable to authority figures." (345–346)
• Self-demotion: "having the wearer be or seem to be required to wear the device as part of a company uniform while running errands on company time." (346)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “Surveillance is a silly game of make-believe, like we can pretend we a…” (344): Jennifer Marchand, a performer, quoted by the authors.$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Sousveillance$t$;
  end if;

  -- Borradaile, Glencora; Reeves, Joshua: Sousveillance Capitalism (8 quotes)
  if not exists (select 1 from public.sources where title = $t$Sousveillance Capitalism$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Sousveillance Capitalism$t$, $t$Borradaile, Glencora; Reeves, Joshua$t$,
      $t${"publication": "Surveillance & Society", "volume": "18", "issue": "2", "date": "2020", "pages": "272–275"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The ACLU’s Mobile Justice app offers a good case in point.$t$, $t$273$t$, array['highlighted', 'sousveillance', 'surveillance-capitalism']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$All this is to say, Mobile Justice illustrates how active complicity with digital capitalism has become a necessary condition of political participation (and really, of course, a necessary condition of contemporary social, political, and professional life).$t$, $t$274$t$, array['highlighted', 'sousveillance', 'surveillance-capitalism']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Valued as the key to political inclusion and democratic participation, new media technologies strengthen the hold of neoliberalism and the privilege of the top one percent of people on the planet.$t$, $t$275$t$, array['highlighted', 'sousveillance', 'surveillance-capitalism']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Surveillance capitalism—like capitalism in general—thrives by cultivating and stimulating any kind of activity on which it can capitalize, including activities that in some ways might be disadvantageous or ideologically opposed to capitalism itself.$t$, $t$273$t$, array['sousveillance', 'surveillance-capitalism']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Hence, while calls for transparency vis-à-vis the police (and other authorities) generally make good political sense, we should be cautious about why, how, and to what ultimate effect sousveillance is carried out.$t$, $t$273$t$, array['sousveillance', 'surveillance-capitalism', 'policing', 'visibility']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Surveillance culture has an intimate and mutually-informing relationship with surveillance capitalism.$t$, $t$274$t$, array['sousveillance', 'surveillance-capitalism', 'privacy']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$We have joined this chorus of critique by claiming that sousveillance will fail to live up to its political promise if it relies on the technologies and methods of surveillance capitalism.$t$, $t$274$t$, array['sousveillance', 'surveillance-capitalism', 'resistance']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$This insistence on on-the-ground collective action could, in the end, be considerably more valuable than whatever surveillance/intelligence is produced by activists’ phones.$t$, $t$275$t$, array['sousveillance', 'surveillance-capitalism', 'resistance']::text[], now() - interval '7 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Cop-watching and similar sousveillance now run on smartphones and apps built by the same companies that profit from surveillance.
• Their example is the ACLU's Mobile Justice app, funded by a Google.org grant, which runs only on Apple and Google platforms and produces data.
• Activists end up feeding the system they're resisting. Taking part in politics now requires complicity with digital capitalism.
• Text-based alternatives like Cop Map show sousveillance can avoid some of these tools.
• The authors suggest the real value of cop-watching may be people gathering in physical space, not the footage, but they accept that digital tools will still be needed.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Strategic incapacitation (Wilson and Serisier): "police-driven strategies for squelching citizen-to-police sousveillance." (273)
• Digital enclosure (Andrejevic): a space that, "now that it is released from any geographical grounding, refuses to recognize even conceptual limits," whose nature "is to expand and permeate." (273)
• Mobile Justice: an ACLU app built to "record, report, and witness" interactions between citizens and the police. (273)
• Cop Map: a project that "has users anonymously post text reports to a website" instead of using mobile media. (274)
• Extra-epistemological value of sousveillance: "the non-epistemological, non-intelligence-based political significance of collective sousveillance." In other words, "the synergy of real-world collective political activity." (274–275)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “The ACLU’s Mobile Justice app offers a good case in point.…” (273): This is the topic sentence for their main example. The app lets users "record, report, and witness" police encounters and sends the footage straight to the ACLU.
• “Valued as the key to political inclusion and democratic participation,…” (275): Jodi Dean (2009, p. 47), quoted by the authors. The full quote continues: "At the same time, globally networked communications remain the very tools and terrains of struggle, making political change more difficult—and more necessary—than ever before."
• “Surveillance culture has an intimate and mutually-informing relationsh…” (274): David Lyon (2019, p. 72), quoted by the authors.$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Sousveillance Capitalism$t$;
  end if;

  -- Volinz, Lior: From Above and Below (10 quotes)
  if not exists (select 1 from public.sources where title = $t$From Above and Below$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$From Above and Below$t$, $t$Volinz, Lior$t$,
      $t${"subtitle": "Surveillance, Religion, and Claim-Making at Jerusalem’s Temple Mount/Haram al-Sharif", "publication": "Surveillance & Society", "volume": "16", "issue": "4", "date": "2018", "pages": "446–458"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$This article posits that colonial surveillance at religious sites is different—that, unlike other colonial spaces, the particularities of holy sites as arenas of contestation can enlarge the scope of worshippers’ negotiation of state surveillance technologies and practices, while enabling new modes of claim-making of rights and resources articulated through surveillance.$t$, $t$447$t$, array['palestine', 'religion', 'colonialism', 'resistance']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Despite the etymological and historical ties to the all-seeing, all-knowing gaze of God upon his people (Tawil-Souri 2016: 57), surveillance today is anything but holy.$t$, $t$448$t$, array['palestine', 'religion', 'visibility']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Yet a religious conflict is never detached from the specific social, political, and economic context it arises within.$t$, $t$448$t$, array['palestine', 'religion']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Digital surveillance allows the state to categorise and sort the bodies of worshippers within clearly demarcated “spaces of belonging” and “spaces of intrusion.”$t$, $t$451$t$, array['palestine', 'religion']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$I want to go in and out of al-Aqsa as I please—who are they to surveil me? . . . I am entering a house of worship.$t$, $t$452$t$, array['palestine', 'religion']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$A protest over the surveillance of a religious site was widely understood as a demand for equal distribution of rights: to privacy, unhindered mobility, and religious autonomy.$t$, $t$453$t$, array['palestine', 'religion', 'privacy', 'resistance']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Reversing the colonial gaze entails a rejection of the Israeli authorities’ monopoly over surveillance, as well as the right to interpret ongoing events and their visual documentation.$t$, $t$454$t$, array['palestine', 'religion', 'colonialism', 'visibility']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Unable to match the Israeli police and military capacities, Palestinians use sousveillance as a “weapon of the weak,” seeking to draw attention to their plight by documenting and disseminating imagery of perceived infringements upon their rights and (religious) autonomy.$t$, $t$454$t$, array['palestine', 'religion', 'sousveillance', 'policing']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$“Neutral” surveillance can transform disputes over content into disputes over technicalities—cameras’ angles, preciseness, as well as temporal and spatial coverage.$t$, $t$455$t$, array['palestine', 'religion', 'objectivity']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$On Haram-al-Sharif, governed by a fragile, ill-defined and unwritten status quo, adjudicating surveillance can therefore not replace a political solution.$t$, $t$455$t$, array['palestine', 'religion']::text[], now() - interval '9 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Volinz argues that colonial surveillance works differently at holy sites, because their sacred status gives worshippers more room to push back.
• The article is based on 11 months of fieldwork in Jerusalem (2015–16), and looks at three kinds of surveillance at the Temple Mount/Haram al-Sharif.
• From above: Israeli CCTV (Mabat 2000), checkpoints, and planned "smart cameras" sort worshippers by threat. After protests in 2017, Israel dropped the smart cameras.
• From below: Palestinian activists film Israeli police and Temple activists and share the footage to rally Arab and Muslim support, using it as a "weapon of the weak."
• Adjudicating: a US-brokered plan for Jordanian cameras promised "neutral" footage. Palestinians, who were left out of the talks, rejected it and the plan was abandoned.
• Through each kind of surveillance, worshippers make wider national, religious, and human rights claims.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Founding surveillance (Handel): "the gaze of an antagonistic ruler over a subject population." (447)
• Inclusive/bio-political surveillance (Handel): "a disciplinary surveillance aimed at sorting “appropriate behaviour” from potential societal or security threats." (447)
• Exclusionary surveillance (Handel): surveillance that "divides and separates the population when groups of (non)citizens are deemed as redundant, surplus, or dangerous." (447)
• Security theology (Shalhoub-Kevorkian): the idea that "Israel ‘security’ was transformed into a religion . . . a settler colonial theology." (448)
• Surveillance (Lyon): "the focused, systematic and routine attention to personal details for the purposes of influence, management, protection or direction." (450)
• Murabitun and Murabitat: "self-appointed guardians of al-Aqsa—groups of men and women, respectively." (450)
• Sousveillance: "“watching from below,” has been conceptually explored both as a type of inverse surveillance and as participatory surveillance." (453)
• Adjudicating surveillance: surveillance that "emerges where parties to a conflict, willingly or out of external imposition, turn to surveillance technology to pass judgement on the dispute between them." (455)
• Surveillance positivism (Los): an approach "where human reflection and discretion are removed from the automated application of technology in the pursuit of order and security." (455)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “I want to go in and out of al-Aqsa as I please—who are they to surveil…” (452): A Palestinian activist quoted in a 2017 Al Jazeera interview (Tahhan), cited by Volinz.$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$From Above and Below$t$;
  end if;

  -- Godarzani-Bakhtiari, Mina: Sousveillance as an Ambiguous Practice of Negotiating In/Visibility (11 quotes)
  if not exists (select 1 from public.sources where title = $t$Sousveillance as an Ambiguous Practice of Negotiating In/Visibility$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Sousveillance as an Ambiguous Practice of Negotiating In/Visibility$t$, $t$Godarzani-Bakhtiari, Mina$t$,
      $t${"subtitle": "The Case of Forensic Architecture", "publication": "Surveillance & Society", "volume": "24", "issue": "3", "date": "2026", "pages": "313–333"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Rather than simply unveiling power, sousveillance operates within a complex and contested terrain where visibility is always negotiated, ambiguous, and potentially co-opted.$t$, $t$315$t$, array['sousveillance', 'visibility']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Instead of understanding sousveillance per se as an emancipative act of resistance and the visibility it creates as inherently desirable, its effects are contingent and context-dependent.$t$, $t$315$t$, array['sousveillance', 'visibility', 'resistance']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$[T]urning media records into evidence is an analytical, interpretive activity, and, inescapably, a media production process.$t$, $t$316$t$, array['sousveillance', 'visibility']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$FA operates within positivist evidentiary conventions, the very frameworks it aims to interrogate.$t$, $t$317$t$, array['sousveillance', 'visibility', 'objectivity']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The complex trajectory of violence is thus transformed into a binary logic that determines whether something is spatially possible (with varying degrees of probability) or utterly impossible.$t$, $t$326$t$, array['sousveillance', 'visibility']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$FA de-subjectivizes witnesses by treating them primarily as data points within a spatial grid.$t$, $t$328$t$, array['sousveillance', 'visibility']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$This creates a hierarchy between data and experience, and between spatial-physical information and subjective sense-making.$t$, $t$328$t$, array['sousveillance', 'visibility']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$FA’s gaze from nowhere produces an unmarked position—it’s a “god trick” from outside the system (Haraway 1988: 581).$t$, $t$329$t$, array['sousveillance', 'visibility']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Since FA centralizes its analysis in the video, it is not a distant witnessing of violence, but rather a distant witnessing of the analysis of violence from a godlike perspective.$t$, $t$329$t$, array['sousveillance', 'visibility']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Since nothing appears more persuasive than the natural order of things, why foreground subjective accounts and risk both the political exposure of witnesses and the potential delegitimization of the investigation?$t$, $t$330$t$, array['sousveillance', 'visibility', 'objectivity']::text[], now() - interval '9 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Visibility emerges, then, not as a stable good, but as a contested terrain produced, negotiated, and instrumentalized across fields of knowledge and authority—sometimes even within a single document.$t$, $t$330$t$, array['sousveillance', 'visibility']::text[], now() - interval '10 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Godarzani-Bakhtiari closely analyzes one Forensic Architecture video, about the 2020 killing of Syrian refugee Mohammad Al-Arab at the Turkish-Greek border.
• Forensic Architecture builds evidence step by step: it locates the scene from satellite images, places the soldiers, measures distances and rifle range, and only then plays the witness testimony.
• Its power comes from "spatial objectivity," which treats people as coordinates and violence as a question of what was physically possible.
• This is ambiguous. It sidelines witnesses' experience and puts Forensic Architecture in a godlike, colonial-style viewing position. But it also sets aside the citizen/migrant distinction that drove the violence, and it ends by giving witnesses their own voice.
• Her larger point is that sousveillance isn't automatically resistance. What matters is how visibility gets produced, and the social relations it sets up.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Sousveillance: "“watching from below”—looks at practices of observing those in power with the aim of exposing wrongdoing and, ultimately, neutralizing surveillance." (314)
• Visibility (after Monahan): "a practical and processual achievement through which the world is ordered and social relations are established." (314)
• Naive realism: the belief that visuals "are interpretation-free illustrations, representing meaning generated through their mechanically objective production." (316)
• Professional vision (Goodwin): the idea that "certain professions see and interpret visuals in culturally specific ways, enacted by the embodied practices of showing." (316)
• Vernacular analysis (Tuma): "how actors see, interpret, and communicate about visual documents in their own particular, culturally specific ways." (316)
• Meta-artefacts: "documents that encompass all three stages of the knowledge-production process: data collection, data analysis, and presentation of results." (317)
• Spatial objectivity: a "constructed objectivity—which builds on mechanical objectivity (satellite imagery and video) but abstracts further from it through an understanding of an abstract space." (322)
• God trick (Haraway): "FA’s gaze from nowhere produces an unmarked position." (329)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “[T]urning media records into evidence is an analytical, interpretive a…” (316): Kelly Gates (2020, p. 404), quoted by the author.$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Sousveillance as an Ambiguous Practice of Negotiating In/Visibility$t$;
  end if;

  -- Mushkin, Hillary: Survey to Surveillance (12 quotes)
  if not exists (select 1 from public.sources where title = $t$Survey to Surveillance$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Survey to Surveillance$t$, $t$Mushkin, Hillary$t$,
      $t${"subtitle": "The U.S.-Mexico Border Is Not a Line on the Ground, but a Network Diagram Drawn Through Bodies and Databases", "publication": "Places Journal", "date": "2021-04"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$These things — animal, vegetable, and mineral — are represented by illustrations, written descriptions, nomenclature, numerical coordinates, mathematical equations, maps, and measurements, each associated with its own evaluative criteria.$t$, '', array['highlighted', 'borders', 'objectivity']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$All the procedures and command-and-control protocols involved, structuring both the analogue and the digital compendia and extending to the very premise of specimen collection and the law itself, are founded on a discourse of scientific objectivity, a belief in standards understood as fair, verifiable, and universal.$t$, '', array['highlighted', 'borders', 'objectivity']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$“To be objective,” write Daston and Galison, “is to aspire to knowledge that bears no trace of the knower — knowledge unmarked by prejudice or skill, fantasy or judgement, wishing or striving.”$t$, '', array['highlighted', 'borders', 'objectivity']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$From the agent’s point of view, the impersonality of the DHS database seemed like a virtue. But my colleague could not experience the real-time application of data points — that is, his arrest — as anything other than violently personal.$t$, '', array['borders', 'objectivity', 'policing']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Taken together, this system of systems — laws, procedures, protocols, lists, limbos, technologies — comprises the U.S. national border.$t$, '', array['borders', 'objectivity']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The border is written on bodies living their daily lives even as those bodies and their activities are logged in bureaucratic databases.$t$, '', array['borders', 'objectivity']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Multiplicity was a bug, not a feature; disorganized data had the potential to undermine operational authority.$t$, '', array['borders', 'objectivity']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The boundary survey, too, is a tool for profiling.$t$, '', array['borders', 'objectivity']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Land surveys and policing surveillance are not only authoritative, but authored; they are produced by people working in particular traditions, within particular cultural, political, and epistemological frames.$t$, '', array['borders', 'objectivity', 'policing']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Automation obscures officials’ original, discriminatory decision to tabulate data about immigrants and their “associates” in the first place.$t$, '', array['borders', 'objectivity']::text[], now() - interval '9 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$But nature is disorderly. “Natural order” does not emerge naturally.$t$, '', array['borders', 'objectivity']::text[], now() - interval '10 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$But as the drone looked down from its seemingly omnipotent technological perspective to record us standing in the sand amidst the creosote bushes, it could not register this crucial difference.$t$, '', array['borders', 'objectivity']::text[], now() - interval '11 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Mushkin, an artist, opens with a colleague's arrest by ICE to show that the border is a "system of systems" of laws, databases, and procedures, not a line on the ground.
• She links the 1850s U.S.-Mexico Boundary Survey, which catalogued plants, animals, and Native peoples to support settler expansion, to today's DHS databases like HART and Palantir's tools.
• Both rely on scientific objectivity to turn messy reality into neat, actionable profiles, sidelining Indigenous knowledge and anything that doesn't fit.
• Because profiles are authored, not just found, she argues the border could be represented differently.
• Her 2020 trip with artists and Caltech scientists to Carrizo Creek mixed drones with watercolors as a way to "draw the line differently."$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Pocket trash: "the official ICE designation for such personal effects" as a wallet, phone, keys, and notes. (PDF 2)
• Border as network diagram: "we might picture the border not as a single line but as a network diagram. In this diagram, points are connected by lines and clustered in groups." (PDF 5–6)
• HART (Homeland Advanced Recognition Technology): "one of the largest law enforcement databases in the world, a tool through which the Department of Homeland Security organizes biometric information culled from immigrants and their family members, including U.S. citizens." (PDF 8–9)
• ICM and FALCON-SA: Palantir software. "ICM enables agents to organize data into individual human “profiles,” and FALCON-SA “draws connections” between these individual dossiers, thereby profiling entire communities." (PDF 16)
• Profile: "The term originates in the artistic practice of drawing an outline, typically as a form of portraiture; despite (or in service of) its usefulness in creating a likeness, an outline deliberately omits the complexity of detail within its margins." (PDF 18)
• Measurable behavioral characteristics: data "based in the recognition of particular, idiosyncratic patterns — gait when walking or keystrokes when typing; heartbeat patterns; geolocational and navigational habits." (PDF 25)
• LEISS: "a back-end system that connects a broad array of federal, state, local, tribal, and international law enforcement agencies to ICE databases." (PDF 26)
• Epistemic virtue (Daston and Galison): "norms that are internalized and enforced by appeal to ethical values, as well as to pragmatic efficacy in securing knowledge." (PDF 30)
• Reasoned images (Daston and Galison): "scientific illustrations of such “typical,” “characteristic,” “ideal,” or “average” specimens." (PDF 31)
• Will to will-lessness vs. will to willfulness (Daston and Galison): "a scientific self grounded in will to will-lessness at one pole, and an artistic self that circulated around a will to willfulness at the other." (PDF 31)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “These things — animal, vegetable, and mineral — are represented by ill…” (PDF 6): "These things" are the points in her picture of the border as a network diagram.
• ““To be objective,” write Daston and Galison, “is to aspire to knowledg…” (PDF 30): Daston and Galison's words, from Objectivity (2007), quoted by Mushkin.
• “But as the drone looked down from its seemingly omnipotent technologic…” (PDF 40): "This crucial difference" is that her team were not migrants crossing without water or permission.
• Web article: quotes have no page numbers, since Chicago doesn’t use them for web sources. Locations: “These things — animal, vegetable, and mi…” → PDF 6; “All the procedures and command-and-contr…” → PDF 29; ““To be objective,” write Daston and Gali…” → PDF 30; “From the agent’s point of view, the impe…” → PDF 2; “Taken together, this system of systems —…” → PDF 3; “The border is written on bodies living t…” → PDF 4; “Multiplicity was a bug, not a feature; d…” → PDF 14; “The boundary survey, too, is a tool for …” → PDF 18; “Land surveys and policing surveillance a…” → PDF 18; “Automation obscures officials’ original,…” → PDF 26; “But nature is disorderly. “Natural order…” → PDF 31; “But as the drone looked down from its se…” → PDF 40$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Survey to Surveillance$t$;
  end if;

  -- Shtaya, Mona: Nowhere to Hide (10 quotes)
  if not exists (select 1 from public.sources where title = $t$Nowhere to Hide$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Nowhere to Hide$t$, $t$Shtaya, Mona$t$,
      $t${"subtitle": "The Impact of Israel's Digital Surveillance Regime on the Palestinians", "publication": "Middle East Institute", "date": "2022-04-27"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Occupied Palestine effectively functions as an open-air laboratory for Israel to test techniques of espionage and surveillance before selling them to repressive regimes around the world.$t$, '', array['palestine', 'colonialism', 'surveillance-capitalism']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The point is not only to watch Palestinians through strategically placed cameras, but also — and what’s perhaps more insidious — to make them feel watched no matter where they are.$t$, '', array['palestine', 'colonialism', 'visibility']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Surveillance lies at the very heart of occupation.$t$, '', array['palestine', 'colonialism']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Israeli soldiers are ordered to enter the photos and details of at least 50 Palestinians into the IDF’s Blue Wolf tracking system over the course of each shift.$t$, '', array['palestine', 'colonialism', 'military']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Some women in Jerusalem are afraid to remove their hijabs at home because they sense they're being watched, even in the most intimate of settings.$t$, '', array['palestine', 'colonialism', 'gender', 'privacy']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$This unabating sense of surveillance threatens to bring about a fragmented society wracked with suspicion and cowed by fear.$t$, '', array['palestine', 'colonialism', 'chilling-effects']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In other words, surveillance prompts Palestinians to self-censor, which is inimical to the principles of an open society.$t$, '', array['palestine', 'colonialism', 'chilling-effects']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$From such decisions, it has become clear that the Israeli government considers the meaning of privacy and autonomy to be variable, subject to distinct logic depending on whose privacy is at stake.$t$, '', array['palestine', 'colonialism', 'privacy']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Unfortunately, government monitoring has been so normalized in the collective conscience that surveillance cameras no longer raise indignation.$t$, '', array['palestine', 'colonialism', 'chilling-effects', 'biopolitics']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In the fight against surveillance, nothing less than freedom is at stake.$t$, '', array['palestine', 'colonialism']::text[], now() - interval '9 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• Shtaya, a Palestinian digital rights advocate, describes overlapping layers of surveillance on Palestinians: by the Israeli state, by tech companies, and by the Palestinian Authority.
• Her examples include CCTV in Jerusalem and Hebron, facial recognition, the Blue Wolf/Wolf Pack profiling system, Israeli control of internet infrastructure, and spyware.
• She argues the main goal is to make Palestinians feel constantly watched, which leads to self-censorship, distrust, and less organizing.
• She points out that Israel's Supreme Court blocked facial recognition in Israeli public spaces, which she reads as privacy being protected differently depending on whose it is.
• She calls for a global, cross-movement campaign for a universal right to privacy and pressure on surveillance suppliers.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Panopticon: "a mechanism of social and psychological control proposed by the English philosopher Jeremy Bentham in the 18th century." (Introduction)
• Demonstrating presence: an IDF tactic "which promotes Israeli patrols of Palestinian communities for the sole purpose of exhibiting the army's sprawling reach." (Introduction)
• Surveillance capitalism (Zuboff): a system "whereby social media companies collect user data for profit through increasingly invasive means of data collection and analysis." (Introduction)
• Mabat 2000: Israel's "technological and surveillance center," launched in 2000. "Mabat" means "gaze" in Hebrew. (Surveillance in daily life)
• Blue Wolf: "a smartphone app powered by a massive database of Palestinians’ personal information." (Surveillance in daily life)
• Wolf Pack: the larger database behind Blue Wolf, "which seeks to profile every Palestinian living in the West Bank." (Surveillance in daily life)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• Web article: quotes have no page numbers, since Chicago doesn’t use them for web sources. Locations: “Occupied Palestine effectively functions…” → Introduction; “The point is not only to watch Palestini…” → Introduction; “Surveillance lies at the very heart of o…” → Introduction; “Israeli soldiers are ordered to enter th…” → Surveillance in daily life; “Some women in Jerusalem are afraid to re…” → Access and data; “This unabating sense of surveillance thr…” → Access and data; “In other words, surveillance prompts Pal…” → Psychological surveillance; “From such decisions, it has become clear…” → Psychological surveillance; “Unfortunately, government monitoring has…” → Conclusion; “In the fight against surveillance, nothi…” → Conclusion$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Nowhere to Hide$t$;
  end if;

  -- Qandeel, Mais; Topak, Özgün Erdener: Genocidal Surveillant Assemblage in Palestine (13 quotes)
  if not exists (select 1 from public.sources where title = $t$Genocidal Surveillant Assemblage in Palestine$t$ and user_id = uid) then
    insert into public.sources (user_id, type, title, authors, details, citation_overrides)
    values (uid, 'article', $t$Genocidal Surveillant Assemblage in Palestine$t$, $t$Qandeel, Mais; Topak, Özgün Erdener$t$,
      $t${"subtitle": "A Socio-Legal Analysis", "publication": "Journal of Genocide Research", "date": "2025-10-08", "pages": "1–22", "doi": "10.1080/14623528.2025.2567372"}$t$::jsonb,
      $t${}$t$::jsonb)
    returning id into sid;
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$As he puts it: “what distinguishes genocides from premodern massacres of civilians is their systematic, ideologically articulated, technologically effective, centralised and state-run character.”$t$, $t$5$t$, array['highlighted', 'palestine', 'genocide']::text[], now() - interval '0 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$In 2021, Israel deployed AI systems, including the Gospel, to produce targets in a military operation in the Gaza strip. This was the first reported use of AI-targeting systems in a military operation.$t$, $t$9$t$, array['highlighted', 'palestine', 'genocide', 'ai-targeting', 'military']::text[], now() - interval '1 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The Lavender seems to be the more advanced version of the Gospel designed to produce more targets by integrating and processing all possible surveillance data.$t$, $t$10$t$, array['highlighted', 'palestine', 'genocide', 'ai-targeting']::text[], now() - interval '2 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The system works in conjunction with another system called “Where’s Daddy” which is a tracking program that determines when suspects reach their homes so that they can be killed along with their families and neighbours.$t$, $t$10$t$, array['highlighted', 'palestine', 'genocide', 'ai-targeting']::text[], now() - interval '3 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$There are three important legal questions regarding the GSA: first, the legality of Israel’s decades long mass surveillance of Palestinians which eventually fuelled the GSA; second, the legality of the GSA’s AI – targeting systems (such as Gospel, Lavender and Where’s Daddy) which mobilize the collected data through mass surveillance to enable the genocide; and third, the intention behind deployment of GSA as genocidal.$t$, $t$12$t$, array['highlighted', 'palestine', 'genocide', 'ai-targeting', 'international-law']::text[], now() - interval '4 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$International humanitarian law (IHL), including the law of belligerent occupation, among others, governs Israel’s conduct in Palestine. Accordingly, Israel, as the occupying power, must adhere to the “principle of respect for the human person and the inviolable character of the basic rights of individual men and women” in Palestine.$t$, $t$13$t$, array['highlighted', 'palestine', 'genocide', 'colonialism', 'international-law']::text[], now() - interval '5 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The GSA combines various surveillance systems and sources – including data from intercepted communications and drone visuals, and harnesses the collected data with AI algorithms to generate targets for mass destruction.$t$, $t$4$t$, array['palestine', 'genocide', 'ai-targeting']::text[], now() - interval '6 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Human operators act as “stamp[s] of approval,” devoting 20 seconds to simply check whether the AI generated target is a male or female, and assume that if the target is a male, it is a legitimate target.$t$, $t$10$t$, array['palestine', 'genocide', 'gender']::text[], now() - interval '7 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$When you hold so much data, you can direct it toward[s] any purpose you choose.$t$, $t$11$t$, array['palestine', 'genocide']::text[], now() - interval '8 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Mass surveillance is indiscriminate in its effect because it does not distinguish between combatants and civilians.$t$, $t$14$t$, array['palestine', 'genocide']::text[], now() - interval '9 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$Surveillance in Palestine today is a means to genocide.$t$, $t$16$t$, array['palestine', 'genocide']::text[], now() - interval '10 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The fact that the GSA generates targets does not mean that it engages in “targeted” killings of specific known militants, it rather means that the GSA engages in mass killings using target generation as a technique of genocidal power.$t$, $t$21$t$, array['palestine', 'genocide', 'ai-targeting']::text[], now() - interval '11 seconds');
    insert into public.quotes (user_id, source_id, text, locator, tags, created_at)
    values (uid, sid, $t$The machine did it coldly. And that made it easier.$t$, $t$22$t$, array['palestine', 'genocide', 'ai-targeting']::text[], now() - interval '12 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Summary
• The authors argue that Israel has built a "Genocidal Surveillant Assemblage": decades of mass surveillance data on Palestinians, fused with AI targeting systems, used to generate targets in Gaza since October 2023.
• They trace its roots from early censuses and ID cards through checkpoints and predictive policing (since 2017) to Gospel, Lavender, Where's Daddy, an AI language model, drones, and Amazon and Google cloud infrastructure.
• Drawing mainly on investigative reporting (especially +972 Magazine), they describe systems that score people, accept large numbers of civilian deaths per target, and keep lowering the threshold as targets run out.
• Legally, they argue the mass surveillance itself breaks the law of occupation and the principles of distinction, proportionality, and precaution.
• They argue that deploying these systems is evidence of genocidal intent, and that the model could be exported to future conflicts.$t$, now() - interval '0 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Key terms
• Surveillant assemblage (Haggerty and Ericson): "the convergence of once discrete surveillance systems." (4)
• Genocidal Surveillant Assemblage (GSA): the authors' term. It "combines various surveillance systems and sources... and harnesses the collected data with AI algorithms to generate targets for mass destruction." (4)
• Targeting Directorate: a unit whose goal "has been to proactively compile a database – or “bank” – of potential targets." (3)
• Data doubles: "digital profiles of individuals constructed through their various transactions including health, internet, communications, consumption and finances." (5)
• Infrastructural power (Michael Mann): "the capacity of the state to actually penetrate civil society and implement its actions across its territories." (5)
• Authoritarian Surveillant Assemblage (Topak): a state "assembling diverse surveillance systems together to crush dissent." (5)
• Project Nimbus: Israel's partnership "with Amazon and Google... to establish cloud infrastructure." (9)
• Gospel: a system "designed to generate buildings and infrastructure associated with suspects as targets." (10)
• Lavender: a system that "focuses on generating suspected individuals as targets." (10)
• Where's Daddy: "a tracking program that determines when suspects reach their homes." (10)
• Principle of distinction: parties must "at all times distinguish between the civilian population and combatants and between civilian objects and military objectives." (15)
• Principle of proportionality: prohibits attacks "expected to cause incidental loss of civilian life... which would be excessive in relation to the concrete and direct military advantage anticipated." (15)
• Dolus specialis: "a special intent... that is distinctive to the crime of genocide." (16)$t$, now() - interval '1 seconds');
    insert into public.notes (user_id, source_id, body, created_at)
    values (uid, sid, $t$Citation notes
• “As he puts it: “what distinguishes genocides from premodern massacres …” (5): "He" is the sociologist Siniša Malešević. These are his words, quoted by the authors.
• “In 2021, Israel deployed AI systems, including the Gospel, to produce …” (9): You highlighted "Gospel" and the second sentence. I included the sentence in between for context.
• “International humanitarian law (IHL), including the law of belligerent…” (13): Your two highlights here run together. The inner quotation is from the ICRC's 1958 commentary on Article 27 of the Fourth Geneva Convention.
• “When you hold so much data, you can direct it toward[s] any purpose yo…” (11): An Israeli intelligence source speaking to +972 Magazine, quoted by the authors.
• “The machine did it coldly. And that made it easier.…” (22): An Israeli soldier who operated Lavender, quoted from +972 Magazine.$t$, now() - interval '2 seconds');
  else
    raise notice 'Skipped (already in library): %', $t$Genocidal Surveillant Assemblage in Palestine$t$;
  end if;

end $$;

/**
 * EastEndLI Client View shares for sold listings whose public page says the
 * listing is no longer active. Each row is the ViewOne address, not a
 * separate address map. A share may be used only when the report street
 * normalizes to `street` for that MLS id.
 *
 * Short URL: https://hedgerow.eastendli.com/?tchreq=${token}&mc
 *
 * 874794 is Mylestone at Meadow Lane, Southampton, sold for $112,500,000 on
 * November 7, 2023. The reports call that sale 700 Meadow Lane (Mylestone).
 * The share page does not print the house number. That one report street is
 * registered below. 933998 is an undisclosed Bridgehampton address and is not
 * 125 Mid Ocean Drive. 906771 is 355 Ox Pasture Road, not 35 Dune Road.
 * 921481 is 105 and 111 Lily Pond Lane, not Beach Lane.
 */
export type ClientViewShare = {
  mlsId: string;
  street: string;
  token: string;
};

export const CLIENT_VIEW_SHARES: readonly ClientViewShare[] = [
  { mlsId: "874794", street: "mylestone at meadow lane", token: "7YC7IJZ27QBK5MNKU5CFI32RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "933998", street: "000 bridgehampton", token: "7YC7IJZ27QBK5MFOUBFFIY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "913145", street: "165 surfside drive", token: "7YC7IJZ27QBK5MFMUBBFS3SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "901142", street: "115 beach lane", token: "7YC7IJZ27QBK5MFNUJBFS2KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "921481", street: "105 and 111 lily pond lane", token: "7YC7IJZ27QBK5MFPUJDVK2SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "913525", street: "370 and 372 further lane", token: "7YC7IJZ27QBK5MFMUBDF63SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "896427", street: "1240 ocean road", token: "7YC7IJZ27QBK5MNEUVDV63CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "906771", street: "355 ox pasture road", token: "7YC7IJZ27QBK5MFNUVCFU2SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "884731", street: "1 boatmans lane", token: "7YC7IJZ27QBK5MNFU5CF42SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "924976", street: "1 mecox field lane", token: "7YC7IJZ27QBK5MFPU5FFU3KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "895813", street: "100 further lane", token: "7YC7IJZ27QBK5MNEUZFVY2CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "913172", street: "107 georgica road", token: "7YC7IJZ27QBK5MFMUBBFU2KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "906000", street: "111 beach lane", token: "7YC7IJZ27QBK5MFNUVBV222RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "896749", street: "111 rose hill road", token: "7YC7IJZ27QBK5MNEUVCFSYSRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "921134", street: "120 126 150 170 noyack path", token: "7YC7IJZ27QBK5MFPUJBF432RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "901470", street: "121 further lane", token: "7YC7IJZ27QBK5MFNUJDVU22RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "880063", street: "125 sandy hollow road", token: "7YC7IJZ27QBK5MNFUNBVW2CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "931318", street: "127 halsey lane", token: "7YC7IJZ27QBK5MFOUJAFYY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "910569", street: "1320 meadow lane", token: "7YC7IJZ27QBK5MFMUNDFWYSRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "924674", street: "134 kellis pond lane", token: "7YC7IJZ27QBK5MFPU5CVU32RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "919454", street: "140 accabonac road", token: "7YC7IJZ27QBK5MFMVJDVQ32RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "895345", street: "140 murray lane", token: "7YC7IJZ27QBK5MNEUZAFS3SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "928509", street: "15 wainscott stone road", token: "7YC7IJZ27QBK5MFPVNDF2YSRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "917686", street: "153 summerfield lane", token: "7YC7IJZ27QBK5MFMURCVK3KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "913248", street: "1730 meadow lane", token: "7YC7IJZ27QBK5MFMUBAVSY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "865120", street: "180 pointe mecox lane", token: "7YC7IJZ27QBK5MNLUZBF622RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "908840", street: "183 sayres path", token: "7YC7IJZ27QBK5MFNVNFVS22RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "914455", street: "199 georgian lane", token: "7YC7IJZ27QBK5MFMU5DVQ3SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "879477", street: "201 lily pond lane", token: "7YC7IJZ27QBK5MNKVJDVU3CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "910050", street: "21 harbor lane", token: "7YC7IJZ27QBK5MFMUNBVQ22RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "917841", street: "217 rose hill road", token: "7YC7IJZ27QBK5MFMURFVS2SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "919233", street: "223 church lane", token: "7YC7IJZ27QBK5MFMVJAV42CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "744260", street: "251 pond lane", token: "7YC7IJZ27QBK5PVJU5AVW22RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "906301", street: "28 cobblefield lane", token: "7YC7IJZ27QBK5MFNUVAF22SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "905309", street: "30 cobb isle road", token: "7YC7IJZ27QBK5MFNUZAF2YSRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "895144", street: "315 rose hill road", token: "7YC7IJZ27QBK5MNEUZBFS32RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "905913", street: "320 majors path", token: "7YC7IJZ27QBK5MFNUZFFY2CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "872196", street: "346 meadow lane", token: "7YC7IJZ27QBK5MNKUFBFI3KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "892513", street: "360 and 366 cobb road", token: "7YC7IJZ27QBK5MNEUFDFY2CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "116470", street: "366 and 376 gin lane", token: "7YC7IJZ27QBK5OFMUVDVU22RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "900458", street: "4 georgica association road", token: "7YC7IJZ27QBK5MFNUNDVQY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "898561", street: "400 blank lane", token: "7YC7IJZ27QBK5MNEVNDFW2SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "884409", street: "474 jobs lane", token: "7YC7IJZ27QBK5MNFU5DV2YSRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "925771", street: "48 captains neck lane", token: "7YC7IJZ27QBK5MFPUZCFU2SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "921598", street: "5 bayberry lane", token: "7YC7IJZ27QBK5MFPUJDFIY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "919925", street: "53 fordune drive", token: "7YC7IJZ27QBK5MFMVJFF63SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "932223", street: "53 matthews lane", token: "7YC7IJZ27QBK5MFOUFAV62CRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "893926", street: "57 georgica road", token: "7YC7IJZ27QBK5MNEUBFF63KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "910004", street: "623 halsey neck lane", token: "7YC7IJZ27QBK5MFMUNBV232RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "910156", street: "637 halsey lane", token: "7YC7IJZ27QBK5MFMUNBFQ3KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "894038", street: "72 highland terrace", token: "7YC7IJZ27QBK5MNEU5BV4Y2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "904158", street: "73 wainscott stone road", token: "7YC7IJZ27QBK5MFNU5BFQY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "876452", street: "75 herrick road", token: "7YC7IJZ27QBK5MNKUVDVQ2KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "913702", street: "809 meadow lane", token: "7YC7IJZ27QBK5MFMUBCF22KRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "902268", street: "99 edwards lane", token: "7YC7IJZ27QBK5MFNUFAVWY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "924868", street: "904 cobb road w", token: "7YC7IJZ27QBK5MFPU5FVWY2RDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "922095", street: "90 silver lane", token: "7YC7IJZ27QBK5MFPUFBVI3SRDLCRT6IXJCIEJG5ATGNQ" },
  { mlsId: "903304", street: "951 flying point road", token: "7YC7IJZ27QBK5MFNUBAF232RDLCRT6IXJCIEJG5ATGNQ" },
];

/** Report streets verified to be the same house as the ViewOne street above. */
const VERIFIED_REPORT_STREETS: readonly { mlsId: string; street: string }[] = [
  { mlsId: "874794", street: "700 meadow lane" },
];

const tokenByMlsAndStreet = new Map<string, string>();
for (const share of CLIENT_VIEW_SHARES) {
  tokenByMlsAndStreet.set(`${share.mlsId}|${share.street}`, share.token);
}
for (const alias of VERIFIED_REPORT_STREETS) {
  const share = CLIENT_VIEW_SHARES.find((item) => item.mlsId === alias.mlsId);
  if (!share) continue;
  tokenByMlsAndStreet.set(`${alias.mlsId}|${alias.street}`, share.token);
}

/** Token for this MLS id only when the normalized street is the one stored for it. */
export function clientViewToken(mlsId: string, street: string) {
  return tokenByMlsAndStreet.get(`${mlsId}|${street}`);
}

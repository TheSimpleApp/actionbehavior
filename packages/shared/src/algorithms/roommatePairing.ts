// Roommate Pairing Algorithm for ABC Summit 2025

export interface RoommateMatch {
  user_1_id: string;
  user_2_id: string;
  match_score: number;
  matched_by: 'algorithm' | 'admin';
}

export interface User {
  id: string;
  job_title: string;
  // Add other user properties as needed
}

// Role-based pairing rules
const PAIRING_RULES: Record<string, string[]> = {
  'BCBA': ['BCBA', 'Sr. BCBA', 'ACD', 'HQ'],
  'Sr. BCBA': ['BCBA', 'Sr. BCBA', 'ACD', 'HQ'],
  'ACD': ['BCBA', 'Sr. BCBA', 'ACD', 'HQ'],
  'AOM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'OM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'Sr. OM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'Group OM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'CD': ['CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ'],
  'Sr. CD': ['CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ'],
  'Group CD': ['CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ'],
  'Rising Star': ['Rising Star', 'Rising Star+'],
  'Rising Star+': ['Rising Star', 'Rising Star+'],
  'RDO': ['RDO', 'RCD'],
  'RCD': ['RDO', 'RCD'],
  'Market Leader': ['Market Leader', 'VP'],
  'VP': ['Market Leader', 'VP'],
  'HQ': ['BCBA', 'Sr. BCBA', 'ACD', 'CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ']
};

function canPair(user1Role: string, user2Role: string): boolean {
  const allowedRoles = PAIRING_RULES[user1Role] || [];
  return allowedRoles.includes(user2Role);
}

function calculateMatchScore(
  user1Id: string,
  user2Id: string,
  selections: Map<string, { choice_1?: string; choice_2?: string; choice_3?: string; open_to_any_gender: boolean }>
): number {
  const user1Selections = selections.get(user1Id);
  const user2Selections = selections.get(user2Id);
  
  if (!user1Selections || !user2Selections) return 0;

  let score = 0;

  // Mutual first choice = highest score
  if (user1Selections.choice_1 === user2Id && user2Selections.choice_1 === user1Id) {
    score += 100;
  }
  // One-way first choice
  else if (user1Selections.choice_1 === user2Id || user2Selections.choice_1 === user1Id) {
    score += 30;
  }
  // Mutual second choice
  else if (user1Selections.choice_2 === user2Id && user2Selections.choice_2 === user1Id) {
    score += 50;
  }
  // One-way second choice
  else if (user1Selections.choice_2 === user2Id || user2Selections.choice_2 === user1Id) {
    score += 20;
  }
  // Mutual third choice
  else if (user1Selections.choice_3 === user2Id && user2Selections.choice_3 === user1Id) {
    score += 30;
  }
  // One-way third choice
  else if (user1Selections.choice_3 === user2Id || user2Selections.choice_3 === user1Id) {
    score += 10;
  }

  return score;
}

export async function runRoommatePairing(
  eventId: string,
  users: User[],
  selections: Array<{
    user_id: string;
    choice_1_user_id?: string;
    choice_2_user_id?: string;
    choice_3_user_id?: string;
    open_to_any_gender: boolean;
  }>
): Promise<{
  matches: RoommateMatch[];
  unmatched: User[];
  algorithm_log: string[];
}> {
  const log: string[] = [];
  const matches: RoommateMatch[] = [];
  const unmatched: User[] = [];
  const matched = new Set<string>();

  // Build selections map
  const selectionsMap = new Map<string, { choice_1?: string; choice_2?: string; choice_3?: string; open_to_any_gender: boolean }>();
  selections.forEach(sel => {
    selectionsMap.set(sel.user_id, {
      choice_1: sel.choice_1_user_id,
      choice_2: sel.choice_2_user_id,
      choice_3: sel.choice_3_user_id,
      open_to_any_gender: sel.open_to_any_gender
    });
  });

  // Build users map
  const usersMap = new Map<string, User>();
  users.forEach(user => {
    usersMap.set(user.id, user);
  });

  log.push(`Starting roommate pairing for ${users.length} users`);

  // Find all potential matches with scores
  const potentialMatches: Array<{
    user1: string;
    user2: string;
    score: number;
  }> = [];

  for (const user1 of users) {
    if (matched.has(user1.id)) continue;

    const user1Role = user1.job_title || '';
    const user1Selections = selectionsMap.get(user1.id);

    if (!user1Selections) {
      log.push(`User ${user1.id} has no selections, skipping`);
      continue;
    }

    for (const user2 of users) {
      if (user1.id === user2.id || matched.has(user2.id)) continue;

      const user2Role = user2.job_title || '';

      // Check role compatibility
      if (!canPair(user1Role, user2Role)) {
        continue;
      }

      // Calculate match score
      const score = calculateMatchScore(user1.id, user2.id, selectionsMap);

      if (score > 0) {
        potentialMatches.push({
          user1: user1.id,
          user2: user2.id,
          score
        });
      }
    }
  }

  // Sort by score (highest first)
  potentialMatches.sort((a, b) => b.score - a.score);

  log.push(`Found ${potentialMatches.length} potential matches`);

  // Match users starting with highest scores
  for (const potential of potentialMatches) {
    if (matched.has(potential.user1) || matched.has(potential.user2)) {
      continue;
    }

    matches.push({
      user_1_id: potential.user1,
      user_2_id: potential.user2,
      match_score: potential.score,
      matched_by: 'algorithm'
    });

    matched.add(potential.user1);
    matched.add(potential.user2);

    log.push(`Matched ${potential.user1} with ${potential.user2} (score: ${potential.score})`);
  }

  // Find unmatched users
  for (const user of users) {
    if (!matched.has(user.id)) {
      unmatched.push(user);
      log.push(`User ${user.id} remains unmatched`);
    }
  }

  log.push(`Pairing complete: ${matches.length} matches, ${unmatched.length} unmatched`);

  return {
    matches,
    unmatched,
    algorithm_log: log
  };
}


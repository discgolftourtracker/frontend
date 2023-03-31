export interface IScore {
  ScoreID?: number | string,
  ShortName: string,
  HoleScores: string[],
  GrandTotal: number
}

export interface IScoreLong {
  ResultID?: number;
  RoundID?: number;
  ScoreID?: number;
  FirstName?: string;
  LastName?: string;
  Name?: string;
  AvatarURL?: string;
  City?: string;
  Country?: string;
  Nationality?: any;
  Privacy?: boolean;
  StateProv?: string;
  PDGANum?: number;
  HasPDGANum?: number;
  Rating?: number;
  Division?: string;
  Pool?: string;
  Team?: any;
  TeamName?: any;
  Round?: number;
  Authoritative?: number;
  ScorecardUpdatedAt?: string;
  WonPlayoff?: string;
  Prize?: string;
  PrevRounds?: number;
  RoundStatus?: string;
  Holes?: number;
  LayoutID?: number;
  GrandTotal?: number;
  CardNum?: number;
  TeeTime?: string;
  TeeStart?: any;
  HasGroupAssignment?: number;
  PlayedPreviousRound?: number;
  HasRoundScore?: number;
  UpdateDate?: string;
  Played?: number;
  Completed?: number;
  RoundStarted?: number;
  PrevRndTotal?: number;
  RoundScore?: number;
  SubTotal?: number;
  RoundtoPar?: number;
  ToPar?: number;
  Scores?: string;
  SortScores?: string;
  Pars?: string;
  Rounds?: string;
  SortRounds?: string;
  RoundRating?: number;
  FullLocation?: string;
  ShortName?: string;
  ProfileURL?: string;
  ParThruRound?: number;
  RoundPool?: string;
  TeeTimeSort?: any;
  Teammates?: any[];
  RunningPlace?: number;
  Tied?: boolean;
  HoleScores: string[];
}


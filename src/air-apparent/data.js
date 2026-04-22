// AIR APPARENT — Neil Sethi — real data, real embeds.
// AIR APPARENT is the umbrella project. "Our June" (2025) is the EP title.

// Our June EP tracks. The SoundCloud widget is loaded with the artist's full
// public profile (soundcloud.com/airapparent) because the /sets/our-june URL
// returns no tracks to the Widget API (the set contains unlisted tracks).
// - `scIdx` = position in the profile playlist for in-widget playback
//            (-1 means not on the public profile).
// - `spotifyId` = 22-char Spotify track ID — used to embed an inline Spotify
//   player when a track isn't available via SoundCloud.
export const TRACKS = [
  { n: "01", title: "City at Night",  titleEm: "Night",    jp: "夜の街",     dur: "3:42", mood: "Opener",
    scIdx: 1, spotifyId: "2SYjATFjGtUjYLPxXxmH7S" },
  { n: "02", title: "Long Distance",  titleEm: "Distance", jp: "遠く離れて", dur: "4:18", mood: "Slow burn",
    scIdx: -1, spotifyId: "4J7xosnX8skGohxFFehbwY" },
  { n: "03", title: "Without You",    titleEm: "You",      jp: "君がいない", dur: "3:55", mood: "Confession",
    scIdx: 2, spotifyId: "2IYWwaTOdDzm90sjbgKryL" },
  { n: "04", title: "Echoes",         titleEm: "Echoes",   jp: "響き",       dur: "4:07", mood: "Ambient",
    scIdx: 0, spotifyId: "42h1E8rnYsk9E7oHxp1hpB" },
  { n: "05", title: "Time Heals",     titleEm: "Heals",    jp: "時が癒す",   dur: "3:31", mood: "Closer",
    scIdx: -1, spotifyId: "6EgrNvODkmWr8sHnN0P410" },
];

// Canonical DSP/smart-link URLs.
export const LINKS = {
  smartlink:    "https://symphony.to/air-apparent/our-june-ep",
  spotify:      "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8",
  spotifyAlbum: "https://open.spotify.com/album/6zd63EhRRLaOcayGEKy3QI",
  apple:        "https://music.apple.com/us/artist/air-apparent/1109406941",
  appleAlbum:   "https://music.apple.com/us/album/our-june-ep/1801069031",
  youtube:      "https://www.youtube.com/@AIRAPPARENT",
  youtubemusic: "https://music.youtube.com/channel/UCairapparent",
  amazonmusic:  "https://music.amazon.com/artists/B01FHZ57XM/air-apparent",
  deezer:       "https://www.deezer.com/us/artist/9727222",
  tidal:        "https://tidal.com/browse/artist/airapparent",
  anghami:      "https://play.anghami.com/artist/air-apparent",
  soundcloud:   "https://soundcloud.com/airapparent",
  soundcloudSet:"https://soundcloud.com/airapparent/sets/our-june",
  bandcamp:     "https://airapparent.bandcamp.com",
  bandcampAlbum:"https://airapparent.bandcamp.com/album/our-june",
  epk:          "#/epk",
  instagram:    "https://instagram.com/airapparentmusic",
  tiktok:       "https://tiktok.com/@airapparent",
  bookingEmail: "mgmt@airapparentmusic.com",
  pressEmail:   "mgmt@airapparentmusic.com",
  // Symphony fan-collection landing — consolidates signups from the site.
  fanSignup:    "https://symphony.to/air-apparent/yoympernq0pp",
};

// Embed URLs for primary streamers.
// Note: the Our June set at /sets/our-june does NOT expose its tracks to the
// widget API (the tracks are set-only/unlisted), so we load the artist profile
// which does expose playable tracks, and map individual tracks by index.
export const EMBEDS = {
  soundcloudSet:
    "https://w.soundcloud.com/player/?url=" +
    encodeURIComponent("https://soundcloud.com/airapparent") +
    "&color=%23ff4fd8&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
  spotifyAlbum:  "https://open.spotify.com/embed/album/6zd63EhRRLaOcayGEKy3QI?utm_source=generator&theme=0",
  appleAlbum:    "https://embed.music.apple.com/us/album/our-june-ep/1801069031",
  bandcampAlbum: "https://bandcamp.com/EmbeddedPlayer/album=652111513/size=large/bgcol=0b0514/linkcol=ff4fd8/tracklist=false/transparent=true/",
};

// Primary DSPs shown by default.
export const DSPS = [
  { key: "spotify",      name: "Spotify",       action: "Play",   color: "#1DB954" },
  { key: "apple",        name: "Apple Music",   action: "Play",   color: "#FA5765" },
  { key: "youtubemusic", name: "YouTube Music", action: "Play",   color: "#FF0033" },
  { key: "amazonmusic",  name: "Amazon Music",  action: "Play",   color: "#2FBFE3" },
  { key: "soundcloud",   name: "SoundCloud",    action: "Play",   color: "#FF5500" },
];

export const DSPS_MORE = [
  { key: "tidal",     name: "Tidal",     action: "Play",  color: "#FFFFFF" },
  { key: "deezer",    name: "Deezer",    action: "Play",  color: "#A238FF" },
  { key: "anghami",   name: "Anghami",   action: "Play",  color: "#00BFFF" },
  { key: "bandcamp",  name: "Bandcamp",  action: "Buy",   color: "#629AA0" },
];

// REAL PRESS — pulled from public web coverage.
export const PRESS = [
  { outlet: "EARMILK",              year: "2021", url: "https://earmilk.com/2021/11/02/air-apparent-shares-dreamy-new-single-all-by-yourself-feat-krysta-youngs-and-julia-ross/",
    headline: "Shares dreamy new single 'All By Yourself'",
    pull: "the ultimate ethereal breakup anthem." },
  { outlet: "BroadwayWorld",        year: "2022", url: "https://www.broadwayworld.com/bwwmusic/article/DJ-and-Producer-Air-Apparent-Shares-New-Single-and-Music-Video-20220405",
    headline: "Shares new single '100%' and music video",
    pull: "signature light, airy sound combined with relatable, raw lyricism." },
  { outlet: "Canadian Ravers",      year: "2022", url: "http://canadianravers.com/blog1/2022/9/19/air-apparent-builds-a-vibrant-dreamscape-with-debut-album-chromatic",
    headline: "Builds a vibrant dreamscape with debut album 'Chromatic'",
    pull: "a dynamic, dreamy fantasy that imagines summer lasts all year long." },
  { outlet: "Acid Stag",            year: "2022", url: "https://acidstag.com/2022/11/air-apparent-chromatic-lp/",
    headline: "'Chromatic' LP review",
    pull: "a bright and uplifting soundscape with emotional lyricism and catchy melodies." },
  { outlet: "MELODIC Magazine",     year: "2024", url: "https://www.melodicmag.com/air-apparent-vents-his-frustrations-on-new-song-echoes/",
    headline: "Vents his frustrations on new song 'echoes'",
    pull: "about trying to move on from a past relationship." },
  { outlet: "Bong Mines",           year: "2024", url: "https://www.bongminesentertainment.com/air-apparent-our-junes-echoes-ep/",
    headline: "Listen to AIR APPARENT and our june's 'echoes' EP",
    pull: "the bittersweet aftertaste of love and the lingering emotions of heartache." },
  { outlet: "Happy Mag",            year: "2021", url: "https://happymag.tv/air-apparent-talks-us-through-the-top-10-artists-that-inspired-his-album/",
    headline: "Talks us through the Top 10 artists that inspired his album",
    pull: "a kaleidoscopic collection of songs showing the progression of a relationship." },
  { outlet: "American Songwriter",  year: "2020", url: "https://americansongwriter.com/sorry-air-apparent-song-interview/",
    headline: "Brings energy that bursts at the seams",
    pull: "his foray into electronic music is not what you might consider typical." },
  { outlet: "8oh8 Mag",             year: "2021", url: "https://8oh8.net/interview-with-emerging-dance-music-producer-air-apparent/",
    headline: "Interview with an emerging dance music producer",
    pull: "bouncing between electro-pop, trap & dance music." },
  { outlet: "The Nuance",           year: "2022", url: "https://www.thenuancemagazine.com/nuance-news-feed/air-apparent-reveals-new-synth-track-entitled-leave-me",
    headline: "Reveals new synth track 'Leave Me'",
    pull: "a fun electronic sound reminiscent of 80s funk." },
  { outlet: "Notion",               year: "2021", url: "https://notion.online/air-apparent-interview/",
    headline: "On AIR APPARENT's sound",
    pull: "every time you tune into an AIR APPARENT track — an otherworldly experience." },
];

// Real YouTube IDs — verified via oEmbed against youtube.com/@AIRAPPARENT.
// Layout: first video is `hero` (large), next two are `side` (stacked right).
export const VIDEOS = [
  { title: "Time Heals",   titleEm: "Heals",   jp: "時が癒す",
    tag: "Music Video", year: "2025", len: "3:31", dir: "Dir. Popeye Media",
    size: "hero", ytId: "KQUCNyKeUJA" },
  { title: "100% — feat. ÊMIA", titleEm: "100%", jp: "百パー",
    tag: "Music Video", year: "2022", len: "3:48", dir: "Dir. MoodInfinite + Kelsey Tang",
    size: "side", ytId: "9uXYUhV7-Tg" },
  { title: "Sorry — ft. Krysta Youngs", titleEm: "Sorry", jp: "ゴメン",
    tag: "Music Video", year: "2019", len: "3:45", dir: "from Color Dreams",
    size: "side", ytId: "faE4N7jj6tU" },
];

// 4 most-recent YouTube Shorts from @AIRAPPARENT, scraped 2026-04-22.
export const SHORTS = [
  { title: "i never wanted to give you up",           jp: "手放したくなかった", ytId: "2m7l0ojOmCU" },
  { title: "the immigrant kid playbook",              jp: "移民の子",         ytId: "k5HtaHUBfeU" },
  { title: "the universe's unwavering clock",         jp: "宇宙の時計",       ytId: "dRantJ3Qb8s" },
  { title: "the 'weekend lie' is holding you back",   jp: "週末の嘘",         ytId: "8uarbGJDRYk" },
];

// REAL discography (AIR APPARENT 2017→2025), most recent first.
export const PROJECTS = [
  { title: "Our June",        titleEm: "June",     jp: "私たちの六月", years: "2025",
    kind: "EP · latest",
    blurb: "The new record. Written entirely during a solo journey through Japan — heartbreak, healing, memory. First time on lead vocals throughout. Five songs: City at Night, Long Distance, Without You, Echoes, Time Heals.",
    cover: "/assets/our-june-cover.jpg",
    sp: "https://open.spotify.com/album/6zd63EhRRLaOcayGEKy3QI",
    sc: "https://soundcloud.com/airapparent/sets/our-june",
    bc: "https://airapparent.bandcamp.com/album/our-june" },
  { title: "Island Girls (Remix)", titleEm: "Remix", jp: "リミックス", years: "2024",
    kind: "Single · Burnt Ships remix",
    blurb: "Remix collaboration with Burnt Ships.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "" },
  { title: "RIP — l3na × AIR APPARENT", titleEm: "RIP", jp: "",           years: "2024",
    kind: "Single · w/ l3na",
    blurb: "A collab single with l3na — brooding, atmospheric.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "" },
  { title: "RIP — The Mannequin Remix",  titleEm: "Remix", jp: "リミックス", years: "2024",
    kind: "Remix · l3na × AIR APPARENT",
    blurb: "The Mannequin's take on RIP — darker, dance-floor re-rub.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "" },
  { title: "so high — aellabee × AIR APPARENT", titleEm: "high", jp: "高くまで", years: "2024",
    kind: "Single · w/ aellabee",
    blurb: "Collaboration with aellabee — weightless, late-night.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "" },
  { title: "Letting Go — AIR APPARENT Remix", titleEm: "Go", jp: "手放し", years: "2024",
    kind: "Remix · Josh Dreon original",
    blurb: "AIR APPARENT's remix of Josh Dreon's 'Letting Go'.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "" },
  { title: "Chromatic Remixed", titleEm: "Remixed", jp: "リミックス",   years: "2023",
    kind: "Remix EP",
    blurb: "Chromatic, reimagined. Features the 'Leave Me – Alex Kade Remix' and more.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8",
    sc: "https://soundcloud.com/airapparent/sets/chromatic-the-remixes",
    bc: "https://airapparent.bandcamp.com" },
  { title: "Chromatic",       titleEm: "Chromatic", jp: "クロマティック", years: "2022",
    kind: "Debut LP · 12 tracks",
    blurb: "'80s funk meets electronic dance with soaring R&B/pop hooks. Features Constance, Kcdeeya, GESS, Ellie Jones, Krysta Youngs, Julia Ross, ÊMIA, Meredith Bull, Reo Cragun.",
    cover: "/assets/chromatic-cover.jpg",
    sp: "https://open.spotify.com/album/3PWX9xeIKuGIxge33SgmZY", sc: "", bc: "https://airapparent.bandcamp.com" },
  { title: "100% — feat. ÊMIA", titleEm: "100%",   jp: "百パー",        years: "2022",
    kind: "Single",
    blurb: "Written with Teresa Tuan and Anh Le (ÊMIA) in Brooklyn. Rap verse from Reo Cragun. Mixed by Brent Kolatalo, mastered by Emily Lazar.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8",
    sc: "https://soundcloud.com/airapparent/100-percent", bc: "" },
  { title: "Bad For Me — feat. GESS", titleEm: "Me", jp: "",            years: "2021",
    kind: "Single · via Pug Life Records",
    blurb: "Dance-floor cut with vocalist GESS.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "" },
  { title: "Wonderland — feat. Kcdeeya", titleEm: "Wonderland", jp: "不思議の国", years: "2020",
    kind: "Single",
    blurb: "Heart-fluttering honeymoon-stage pop that would end up on Chromatic.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "" },
  { title: "three strikes — feat. DAVVN", titleEm: "strikes", jp: "三振",  years: "2020",
    kind: "Single · with DAVVN",
    blurb: "The breakout. 119K+ Spotify streams. A louder, dance-floor register.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8",
    sc: "https://soundcloud.com/airapparent/3-strikes-1", bc: "" },
  { title: "Color Dreams",    titleEm: "Dreams",   jp: "色の夢",         years: "2019",
    kind: "EP · 7 tracks",
    blurb: "Seven tracks about dreaming. Features Krysta Youngs, Julia Ross, Adventure Tiger, Victoria Richard.",
    cover: "/assets/color-dreams-cover.jpg",
    sp: "https://open.spotify.com/album/6FFUgZ6BBcnLGHzhpwzElO", sc: "", bc: "https://airapparent.bandcamp.com" },
  { title: "Sorry — feat. Krysta Youngs", titleEm: "Sorry", jp: "ゴメン",    years: "2019",
    kind: "Single · ft. Krysta Youngs",
    blurb: "Shimmering pop ballad with Krysta Youngs. From the Color Dreams era.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "https://airapparent.bandcamp.com" },
  { title: "Tokyo — feat. Julia Ross", titleEm: "Tokyo", jp: "東京",       years: "2018",
    kind: "Single · ft. Julia Ross",
    blurb: "Released between Imaginary and Color Dreams.",
    sp: "https://open.spotify.com/artist/1t4CeVXKlDWTwwroCmPdk8", sc: "", bc: "https://airapparent.bandcamp.com" },
  { title: "Your Love",       titleEm: "Love",     jp: "",              years: "2018",
    kind: "Single",
    blurb: "A bright post-Imaginary follow-up — released on Bandcamp.",
    sp: "", sc: "", bc: "https://airapparent.bandcamp.com" },
  { title: "Imaginary",       titleEm: "Imaginary", jp: "想像",          years: "2018",
    kind: "EP · debut",
    blurb: "Where it started. August 2018. Early indie-dance that drew Purity Ring & CHVRCHES comparisons.",
    sp: "", sc: "https://soundcloud.com/airapparent", bc: "https://airapparent.bandcamp.com" },
  { title: "Before it Gets Dark (Unfold Me)", titleEm: "Unfold Me", jp: "", years: "2017",
    kind: "Single · feat. Michelle Lu",
    blurb: "Pop ballad featuring Michelle Lu.",
    sp: "", sc: "", bc: "" },
  { title: "In Dreams — feat. Adventure Tiger", titleEm: "Dreams", jp: "夢の中で",  years: "2017",
    kind: "Single",
    blurb: "Early Purity Ring / CHVRCHES-leaning track.",
    sp: "", sc: "", bc: "" },
  { title: "Open Eyes",       titleEm: "Eyes",      jp: "",             years: "2017",
    kind: "Single · first release",
    blurb: "The first AIR APPARENT track. Where it all began.",
    sp: "", sc: "", bc: "" },
];

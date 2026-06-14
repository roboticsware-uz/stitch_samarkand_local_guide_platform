CREATE TABLE IF NOT EXISTS guides (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  languages TEXT NOT NULL,
  specialties TEXT NOT NULL,
  bio TEXT NOT NULL,
  vibe TEXT NOT NULL,
  rating REAL DEFAULT 5.0,
  profile_image TEXT
);

-- Seed guides
INSERT INTO guides (name, languages, specialties, bio, vibe, rating, profile_image) VALUES
('Amir', '["Korean", "English"]', '["History", "Archaeology"]', 'Hello, I am Amir! I have a master degree in Central Asian Archaeology. I love walking around Registan and Bibi-Khanym Mosque while sharing historical stories and academic details with my guests. I can speak Korean fluently.', '["Academic", "Deep", "Informative"]', 4.9, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzhWST2QvrD5d2ichLrlAVdhgn9-Nf5ZLr6TyjY3oLyzaSadpcg09KG3kQZL_DclYT_08iA3JvJUrW2zgd1BY_CIHxfQ5jEVfX9YOqydZw8BHuRW_kSNuP36y2gAKOuQuVaksBTZzjXu_sjYpl828WOgMx_5O5ttBchp_Bb43oYM7iMwjE0ygERrXqdev0AtPcfmnzZsgVFoC_OC8NYoqb9uaVc3Yfxi0rme6Rq_AWezw2S5mXOkgAEjk6IiiVE_tQ6a_JOxGuvcdi'),
('Dilshod', '["English", "Russian"]', '["Gastronomy", "Food", "Bazaar"]', 'Hi, I am Dilshod! I am a huge foodie and I know every single hidden restaurant in Samarkand. I can show you where to get the absolute best traditional plov, shashlik, and fresh bread. My tour is highly energetic and friendly.', '["Energetic", "Friendly", "Fun"]', 4.8, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0CPwLG7FHACWxQNAosDySH-gcWu6zWgc6p6Pqof_244bNiJnGNdfyQao1-QK8eAphP-iwvD6SOfuZuauywM-iaHifKiFOEHjkro8C9piwH97f6HDE-PvTFhsBo8UcR9sghb_cNyPd7OJ_emXd4ED-aBUZDyWu8Lc2Wa1eoVd19L1DJOmDtWQxmgL0LGMeWQWjS4dNx2-3znEzEEEZCpybzHDpkVHsDKllRjAZNHkedJERwN7yTkBiPyLzgF325oGy1SIn8THHN38a'),
('Nigora', '["Korean", "English", "Russian"]', '["Photography", "Sightseeing"]', 'Annyeonghaseyo! I am Nigora, a professional travel photographer. I specialize in finding the best spots and angles for photos of historic mosques and madrassas, especially during the golden sunset hour. I will take amazing lifetime photos for you!', '["Creative", "Active", "Warm"]', 4.9, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT46XT9dOrH3X89D_Wqo0SRTYy05hCrfW9Y-EXpftv6WroxKxoN24RHxSLVFYirURbjmovhBrYYMEOAkj5sxM5T83Y-Cl6vPLMSBgjTd08mhxNkuLKPPbW65MkCAWNHAAOTHZ1CTKqREin8cICP2gDNJDm30mMYn5nDTuDkLKxbQyM6l8TJahptuoexnbF8CoQQN1bYwcbmh5wat8ocf5Th655gO6nckaxs2U0bklkg8igvy5PRXUXGK20XwMnDChK0qtbb_8HWOix'),
('Leyla', '["English"]', '["Shopping", "Handicrafts", "Bazaar"]', 'Hello, I am Leyla! I love traditional silk weaving, paper making, and ceramic art. I can take you to the Konigil paper mill and show you the best master workshops in Samarkand. My tours are warm, relaxed, and conversational.', '["Warm", "Conversational", "Relaxed"]', 4.7, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpqZQ7QkBcLIDVh83lGRSaxxdzkAy4icH0M_-k8Ceae92dNAs8sm-ADwUz8_ptc730aLKWw5Wz8JFqQx6vx3yd5Zf-KogQ8QAXDFWfseSR_ON-ersiGIcAPl41UC_DoMDaaqp362ZRSN3yIwOs8Uttg9FemmU6yXMhZ3HKBplNMvXAhTJe-EzL6EZpJN6ur2l4A-FsO_nQ6T7SYtMMbJxmK1bwFjf6UlnxzO3wAZhNP_W3-v4JNKiP4VNrAsWLFwNsGayWfpV-PvKXHbo');

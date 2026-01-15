/**
 * Dummy Questions untuk Simulation Topics
 * Setiap topik memiliki 10 soal multiple choice
 */

export interface SimulationQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string; // "A", "B", "C", or "D"
}

export interface TopicQuestions {
  topicId: string;
  title: string;
  questions: SimulationQuestion[];
}

// ============================================
// TOEFL LISTENING QUESTIONS
// ============================================

export const toeflListeningQuestions: TopicQuestions[] = [
  {
    topicId: "campus-conversation",
    title: "Campus Conversations",
    questions: [
      { id: 1, question: "What is the student's main concern?", options: ["A) Missing a deadline", "B) Finding the library", "C) Registering for classes", "D) Getting a parking permit"], answer: "C" },
      { id: 2, question: "What does the advisor suggest?", options: ["A) Taking fewer courses", "B) Dropping a class", "C) Meeting with a professor", "D) Checking the online system"], answer: "D" },
      { id: 3, question: "When is the registration deadline?", options: ["A) Tomorrow", "B) Next week", "C) This Friday", "D) In two days"], answer: "C" },
      { id: 4, question: "What document does the student need?", options: ["A) Student ID", "B) Transcript", "C) Passport", "D) Insurance card"], answer: "A" },
      { id: 5, question: "Where should the student go next?", options: ["A) The library", "B) The registrar's office", "C) The dean's office", "D) The bookstore"], answer: "B" },
      { id: 6, question: "What problem did the student encounter?", options: ["A) Wrong classroom", "B) Closed course", "C) Missing prerequisite", "D) Schedule conflict"], answer: "D" },
      { id: 7, question: "How long has the student been waiting?", options: ["A) 10 minutes", "B) 30 minutes", "C) 1 hour", "D) 2 hours"], answer: "B" },
      { id: 8, question: "What is the office's operating hours?", options: ["A) 8 AM - 4 PM", "B) 9 AM - 5 PM", "C) 8 AM - 6 PM", "D) 10 AM - 4 PM"], answer: "B" },
      { id: 9, question: "What fee must the student pay?", options: ["A) $25", "B) $50", "C) $75", "D) $100"], answer: "B" },
      { id: 10, question: "What does the woman offer to help with?", options: ["A) Filling out forms", "B) Making copies", "C) Finding a classroom", "D) Contacting a professor"], answer: "A" },
    ],
  },
  {
    topicId: "student-services",
    title: "Student Services",
    questions: [
      { id: 1, question: "What service is being discussed?", options: ["A) Career counseling", "B) Health services", "C) Financial aid", "D) Housing services"], answer: "C" },
      { id: 2, question: "What does the student need to submit?", options: ["A) Tax forms", "B) Medical records", "C) Recommendation letters", "D) Test scores"], answer: "A" },
      { id: 3, question: "When is the application deadline?", options: ["A) March 1st", "B) April 15th", "C) May 1st", "D) June 30th"], answer: "B" },
      { id: 4, question: "How much aid is the student eligible for?", options: ["A) $2,000", "B) $5,000", "C) $8,000", "D) $10,000"], answer: "C" },
      { id: 5, question: "What type of aid is being offered?", options: ["A) Grant", "B) Loan", "C) Scholarship", "D) Work-study"], answer: "A" },
      { id: 6, question: "What must the student maintain?", options: ["A) Full-time status", "B) Part-time job", "C) Campus residence", "D) Club membership"], answer: "A" },
      { id: 7, question: "How often is aid distributed?", options: ["A) Monthly", "B) Quarterly", "C) Each semester", "D) Annually"], answer: "C" },
      { id: 8, question: "What is the minimum GPA requirement?", options: ["A) 2.0", "B) 2.5", "C) 3.0", "D) 3.5"], answer: "C" },
      { id: 9, question: "Where can the student get more information?", options: ["A) Website", "B) Brochure", "C) Phone call", "D) Email"], answer: "A" },
      { id: 10, question: "What should the student do first?", options: ["A) Fill out FAFSA", "B) Meet with advisor", "C) Submit transcripts", "D) Pay deposit"], answer: "A" },
    ],
  },
  {
    topicId: "office-hours",
    title: "Office Hours",
    questions: [
      { id: 1, question: "Why does the student visit the professor?", options: ["A) To discuss grades", "B) To ask about research", "C) To get assignment extension", "D) To clarify lecture content"], answer: "D" },
      { id: 2, question: "What topic confused the student?", options: ["A) Photosynthesis", "B) Cell division", "C) Genetics", "D) Evolution"], answer: "B" },
      { id: 3, question: "What does the professor recommend?", options: ["A) Reading the textbook", "B) Watching videos", "C) Forming study groups", "D) Attending tutoring"], answer: "D" },
      { id: 4, question: "When is the next exam?", options: ["A) Tomorrow", "B) Next Monday", "C) In two weeks", "D) At end of semester"], answer: "C" },
      { id: 5, question: "What chapters will be covered?", options: ["A) 1-3", "B) 4-6", "C) 7-10", "D) 1-10"], answer: "B" },
      { id: 6, question: "How much is the exam worth?", options: ["A) 15%", "B) 20%", "C) 25%", "D) 30%"], answer: "C" },
      { id: 7, question: "What format is the exam?", options: ["A) Multiple choice only", "B) Essay only", "C) Mixed format", "D) Oral presentation"], answer: "C" },
      { id: 8, question: "What extra credit is available?", options: ["A) Research paper", "B) Lab report", "C) Presentation", "D) None"], answer: "A" },
      { id: 9, question: "When are office hours?", options: ["A) Monday 2-4 PM", "B) Tuesday 10-12 PM", "C) Wednesday 3-5 PM", "D) Thursday 1-3 PM"], answer: "C" },
      { id: 10, question: "What does the professor suggest for review?", options: ["A) Past exams", "B) Online quizzes", "C) Class notes", "D) All of the above"], answer: "D" },
    ],
  },
  {
    topicId: "long-conversation",
    title: "Long Conversations",
    questions: [
      { id: 1, question: "What is the main subject of the conversation?", options: ["A) Study abroad program", "B) Internship opportunity", "C) Research project", "D) Club activities"], answer: "A" },
      { id: 2, question: "Where does the student want to go?", options: ["A) France", "B) Spain", "C) Japan", "D) Australia"], answer: "C" },
      { id: 3, question: "How long is the program?", options: ["A) One month", "B) One semester", "C) One year", "D) Two years"], answer: "B" },
      { id: 4, question: "What is required for application?", options: ["A) Language test score", "B) GPA of 3.0", "C) Faculty recommendation", "D) All of the above"], answer: "D" },
      { id: 5, question: "What concerns the student?", options: ["A) Cost", "B) Credits transfer", "C) Language barrier", "D) Safety"], answer: "B" },
      { id: 6, question: "What scholarship is mentioned?", options: ["A) Merit-based", "B) Need-based", "C) Athletic", "D) Government"], answer: "A" },
      { id: 7, question: "When must applications be submitted?", options: ["A) January 15", "B) February 28", "C) March 15", "D) April 1"], answer: "C" },
      { id: 8, question: "What housing option is available?", options: ["A) Dormitory", "B) Homestay", "C) Apartment", "D) All options"], answer: "D" },
      { id: 9, question: "What does the advisor recommend doing first?", options: ["A) Contacting program coordinator", "B) Getting passport", "C) Studying language", "D) Informing parents"], answer: "A" },
      { id: 10, question: "How many students are accepted each year?", options: ["A) 10", "B) 25", "C) 50", "D) 100"], answer: "B" },
    ],
  },
  {
    topicId: "lecture-biology",
    title: "Lecture: Biology",
    questions: [
      { id: 1, question: "What is the main topic of the lecture?", options: ["A) Cell structure", "B) Ecosystem dynamics", "C) Human anatomy", "D) Plant biology"], answer: "B" },
      { id: 2, question: "What role do producers play?", options: ["A) Consume energy", "B) Create energy from sunlight", "C) Decompose matter", "D) Hunt prey"], answer: "B" },
      { id: 3, question: "What percentage of energy transfers between levels?", options: ["A) 5%", "B) 10%", "C) 25%", "D) 50%"], answer: "B" },
      { id: 4, question: "What is a keystone species?", options: ["A) Most abundant species", "B) Largest predator", "C) Species critical to ecosystem", "D) Endangered species"], answer: "C" },
      { id: 5, question: "What example does the professor give?", options: ["A) Wolves in Yellowstone", "B) Lions in Africa", "C) Sharks in ocean", "D) Eagles in mountains"], answer: "A" },
      { id: 6, question: "What happens when apex predators are removed?", options: ["A) Balance improves", "B) Herbivores increase", "C) Plants thrive", "D) Nothing changes"], answer: "B" },
      { id: 7, question: "What is trophic cascade?", options: ["A) Energy flow upward", "B) Chain reaction through food web", "C) Water cycle", "D) Nutrient recycling"], answer: "B" },
      { id: 8, question: "How long did the study last?", options: ["A) 5 years", "B) 10 years", "C) 20 years", "D) 50 years"], answer: "C" },
      { id: 9, question: "What conservation method is discussed?", options: ["A) Habitat protection", "B) Species reintroduction", "C) Hunting regulations", "D) All of the above"], answer: "D" },
      { id: 10, question: "What is the professor's conclusion?", options: ["A) Ecosystems are fragile", "B) Predators are unnecessary", "C) Conservation is futile", "D) Nature is resilient"], answer: "A" },
    ],
  },
  {
    topicId: "lecture-history",
    title: "Lecture: History",
    questions: [
      { id: 1, question: "What historical period is discussed?", options: ["A) Ancient Greece", "B) Roman Empire", "C) Medieval Europe", "D) Renaissance"], answer: "D" },
      { id: 2, question: "What city is the center of this movement?", options: ["A) Rome", "B) Florence", "C) Venice", "D) Milan"], answer: "B" },
      { id: 3, question: "Who funded many Renaissance artists?", options: ["A) The church", "B) Wealthy merchants", "C) Government", "D) Artists themselves"], answer: "B" },
      { id: 4, question: "What family is mentioned as major patrons?", options: ["A) Borgia", "B) Medici", "C) Habsburg", "D) Tudor"], answer: "B" },
      { id: 5, question: "What art technique was developed?", options: ["A) Perspective", "B) Abstract", "C) Impressionism", "D) Cubism"], answer: "A" },
      { id: 6, question: "Which artist is NOT mentioned?", options: ["A) Leonardo da Vinci", "B) Michelangelo", "C) Raphael", "D) Van Gogh"], answer: "D" },
      { id: 7, question: "What scientific advancement occurred?", options: ["A) Printing press", "B) Telescope", "C) Compass", "D) All were mentioned"], answer: "D" },
      { id: 8, question: "How did ideas spread quickly?", options: ["A) Trade routes", "B) Printing press", "C) Universities", "D) All of the above"], answer: "B" },
      { id: 9, question: "What was humanism?", options: ["A) Religious movement", "B) Focus on human potential", "C) Political ideology", "D) Economic theory"], answer: "B" },
      { id: 10, question: "When did the Renaissance end approximately?", options: ["A) 1400", "B) 1500", "C) 1600", "D) 1700"], answer: "C" },
    ],
  },
  {
    topicId: "lecture-arts",
    title: "Lecture: Arts",
    questions: [
      { id: 1, question: "What art movement is the focus?", options: ["A) Impressionism", "B) Expressionism", "C) Surrealism", "D) Pop Art"], answer: "A" },
      { id: 2, question: "Where did this movement originate?", options: ["A) Italy", "B) France", "C) Germany", "D) United States"], answer: "B" },
      { id: 3, question: "What was revolutionary about this style?", options: ["A) Use of color", "B) Focus on light", "C) Subject matter", "D) Canvas size"], answer: "B" },
      { id: 4, question: "Which artist painted 'Water Lilies'?", options: ["A) Renoir", "B) Monet", "C) Degas", "D) Cezanne"], answer: "B" },
      { id: 5, question: "What technique is characteristic?", options: ["A) Thick brushstrokes", "B) Precise lines", "C) Dark colors", "D) Religious themes"], answer: "A" },
      { id: 6, question: "When did this movement begin?", options: ["A) 1850s", "B) 1860s", "C) 1880s", "D) 1900s"], answer: "B" },
      { id: 7, question: "What subject matter was common?", options: ["A) Landscapes", "B) Portraits", "C) Daily life", "D) All of the above"], answer: "D" },
      { id: 8, question: "How did critics initially react?", options: ["A) Enthusiastically", "B) Negatively", "C) Neutrally", "D) Ignored it"], answer: "B" },
      { id: 9, question: "What influenced these artists?", options: ["A) Photography", "B) Japanese prints", "C) Industrial revolution", "D) All of the above"], answer: "D" },
      { id: 10, question: "What came after Impressionism?", options: ["A) Romanticism", "B) Post-Impressionism", "C) Realism", "D) Baroque"], answer: "B" },
    ],
  },
  {
    topicId: "lecture-science",
    title: "Lecture: Physical Science",
    questions: [
      { id: 1, question: "What physics concept is explained?", options: ["A) Gravity", "B) Electromagnetism", "C) Thermodynamics", "D) Quantum mechanics"], answer: "C" },
      { id: 2, question: "What is the first law of thermodynamics?", options: ["A) Energy cannot be created or destroyed", "B) Entropy always increases", "C) Heat flows from hot to cold", "D) Motion requires force"], answer: "A" },
      { id: 3, question: "What is entropy?", options: ["A) Energy measure", "B) Disorder measure", "C) Temperature", "D) Pressure"], answer: "B" },
      { id: 4, question: "What example illustrates heat transfer?", options: ["A) Melting ice", "B) Boiling water", "C) Room cooling", "D) All examples"], answer: "D" },
      { id: 5, question: "What is absolute zero?", options: ["A) 0°C", "B) -273°C", "C) -100°C", "D) 100°C"], answer: "B" },
      { id: 6, question: "What happens at absolute zero?", options: ["A) Molecular motion stops", "B) Water freezes", "C) Gases expand", "D) Light bends"], answer: "A" },
      { id: 7, question: "Who formulated these laws?", options: ["A) Newton", "B) Einstein", "C) Carnot and Clausius", "D) Galileo"], answer: "C" },
      { id: 8, question: "What is an isolated system?", options: ["A) Open to energy", "B) Closed to matter only", "C) No exchange with surroundings", "D) Constantly changing"], answer: "C" },
      { id: 9, question: "What real-world application is discussed?", options: ["A) Refrigeration", "B) Car engines", "C) Power plants", "D) All applications"], answer: "D" },
      { id: 10, question: "Why can't perpetual motion exist?", options: ["A) Friction", "B) Second law", "C) Gravity", "D) Material limits"], answer: "B" },
    ],
  },
];

// ============================================
// TOEFL STRUCTURE QUESTIONS
// ============================================

export const toeflStructureQuestions: TopicQuestions[] = [
  {
    topicId: "subject-verb",
    title: "Subject-Verb Agreement",
    questions: [
      { id: 1, question: "The committee _____ decided to postpone the meeting.", options: ["A) have", "B) has", "C) having", "D) were"], answer: "B" },
      { id: 2, question: "Neither the students nor the teacher _____ present.", options: ["A) were", "B) was", "C) are", "D) have been"], answer: "B" },
      { id: 3, question: "The news _____ very disturbing today.", options: ["A) are", "B) is", "C) were", "D) have been"], answer: "B" },
      { id: 4, question: "Each of the participants _____ a certificate.", options: ["A) receive", "B) receives", "C) receiving", "D) have received"], answer: "B" },
      { id: 5, question: "Mathematics _____ my favorite subject.", options: ["A) are", "B) is", "C) were", "D) have been"], answer: "B" },
      { id: 6, question: "The team _____ playing well this season.", options: ["A) is", "B) are", "C) were", "D) has"], answer: "A" },
      { id: 7, question: "Everyone in the class _____ the assignment.", options: ["A) complete", "B) completes", "C) completing", "D) have completed"], answer: "B" },
      { id: 8, question: "The United States _____ a large country.", options: ["A) are", "B) is", "C) were", "D) have been"], answer: "B" },
      { id: 9, question: "A number of students _____ absent today.", options: ["A) is", "B) are", "C) was", "D) has been"], answer: "B" },
      { id: 10, question: "The number of applicants _____ increasing.", options: ["A) are", "B) is", "C) were", "D) have been"], answer: "B" },
    ],
  },
  {
    topicId: "tenses",
    title: "Verb Tenses",
    questions: [
      { id: 1, question: "By next year, she _____ here for a decade.", options: ["A) will work", "B) will have worked", "C) works", "D) worked"], answer: "B" },
      { id: 2, question: "I _____ him since last summer.", options: ["A) didn't see", "B) haven't seen", "C) don't see", "D) won't see"], answer: "B" },
      { id: 3, question: "While I _____, the phone rang.", options: ["A) studied", "B) was studying", "C) have studied", "D) study"], answer: "B" },
      { id: 4, question: "By the time we arrived, the movie _____.", options: ["A) started", "B) had started", "C) has started", "D) starts"], answer: "B" },
      { id: 5, question: "She _____ English for five years now.", options: ["A) studies", "B) has been studying", "C) studied", "D) will study"], answer: "B" },
      { id: 6, question: "If it rains tomorrow, we _____ the picnic.", options: ["A) cancel", "B) will cancel", "C) cancelled", "D) have cancelled"], answer: "B" },
      { id: 7, question: "The train _____ at 9 AM every day.", options: ["A) leave", "B) leaves", "C) is leaving", "D) left"], answer: "B" },
      { id: 8, question: "I wish I _____ more time to study.", options: ["A) have", "B) had", "C) will have", "D) having"], answer: "B" },
      { id: 9, question: "By 2030, scientists _____ a cure.", options: ["A) will find", "B) will have found", "C) find", "D) found"], answer: "B" },
      { id: 10, question: "She _____ when you called yesterday.", options: ["A) slept", "B) was sleeping", "C) has slept", "D) sleeps"], answer: "B" },
    ],
  },
  {
    topicId: "conditionals",
    title: "Conditionals",
    questions: [
      { id: 1, question: "If I _____ rich, I would travel the world.", options: ["A) am", "B) were", "C) will be", "D) would be"], answer: "B" },
      { id: 2, question: "If she had studied, she _____ the exam.", options: ["A) passed", "B) would have passed", "C) will pass", "D) passes"], answer: "B" },
      { id: 3, question: "Unless you hurry, you _____ the bus.", options: ["A) miss", "B) will miss", "C) missed", "D) would miss"], answer: "B" },
      { id: 4, question: "If water reaches 100°C, it _____.", options: ["A) boils", "B) boiled", "C) will boil", "D) would boil"], answer: "A" },
      { id: 5, question: "I would help you if I _____ time.", options: ["A) have", "B) had", "C) will have", "D) would have"], answer: "B" },
      { id: 6, question: "If he _____ earlier, he wouldn't be late.", options: ["A) left", "B) had left", "C) leaves", "D) will leave"], answer: "B" },
      { id: 7, question: "Provided that you finish, you _____ leave.", options: ["A) could", "B) can", "C) would", "D) might have"], answer: "B" },
      { id: 8, question: "If I were you, I _____ accept the offer.", options: ["A) will", "B) would", "C) can", "D) shall"], answer: "B" },
      { id: 9, question: "Had I known, I _____ differently.", options: ["A) acted", "B) would have acted", "C) act", "D) will act"], answer: "B" },
      { id: 10, question: "If it _____ tomorrow, bring an umbrella.", options: ["A) rained", "B) rains", "C) will rain", "D) rain"], answer: "B" },
    ],
  },
  {
    topicId: "relative-clauses",
    title: "Relative Clauses",
    questions: [
      { id: 1, question: "The book _____ I borrowed is interesting.", options: ["A) who", "B) which", "C) whom", "D) whose"], answer: "B" },
      { id: 2, question: "The man _____ car was stolen filed a report.", options: ["A) who", "B) which", "C) whose", "D) whom"], answer: "C" },
      { id: 3, question: "She is the teacher _____ helped me.", options: ["A) which", "B) who", "C) whose", "D) whom"], answer: "B" },
      { id: 4, question: "The city _____ I was born is famous.", options: ["A) which", "B) where", "C) when", "D) whose"], answer: "B" },
      { id: 5, question: "The reason _____ he left is unclear.", options: ["A) which", "B) why", "C) where", "D) when"], answer: "B" },
      { id: 6, question: "The day _____ we met was rainy.", options: ["A) which", "B) when", "C) where", "D) why"], answer: "B" },
      { id: 7, question: "People _____ exercise regularly are healthier.", options: ["A) which", "B) who", "C) whom", "D) whose"], answer: "B" },
      { id: 8, question: "The student to _____ I spoke was helpful.", options: ["A) who", "B) whom", "C) which", "D) that"], answer: "B" },
      { id: 9, question: "Everything _____ he said was true.", options: ["A) which", "B) that", "C) who", "D) whom"], answer: "B" },
      { id: 10, question: "The hotel _____ we stayed was luxurious.", options: ["A) which", "B) where", "C) when", "D) whose"], answer: "B" },
    ],
  },
  {
    topicId: "passive-voice",
    title: "Passive Voice",
    questions: [
      { id: 1, question: "The letter _____ yesterday.", options: ["A) sent", "B) was sent", "C) is sending", "D) sends"], answer: "B" },
      { id: 2, question: "English _____ in many countries.", options: ["A) speaks", "B) is spoken", "C) speaking", "D) spoke"], answer: "B" },
      { id: 3, question: "The building _____ in 1990.", options: ["A) built", "B) was built", "C) is built", "D) building"], answer: "B" },
      { id: 4, question: "The report _____ by tomorrow.", options: ["A) will complete", "B) will be completed", "C) completes", "D) completed"], answer: "B" },
      { id: 5, question: "The cake _____ by my mother.", options: ["A) made", "B) was made", "C) makes", "D) making"], answer: "B" },
      { id: 6, question: "New laws _____ next month.", options: ["A) will introduce", "B) will be introduced", "C) introduce", "D) introduced"], answer: "B" },
      { id: 7, question: "The homework _____ already _____.", options: ["A) has / done", "B) has / been done", "C) is / done", "D) was / done"], answer: "B" },
      { id: 8, question: "The project _____ currently _____.", options: ["A) is / reviewing", "B) is / being reviewed", "C) was / reviewed", "D) has / reviewed"], answer: "B" },
      { id: 9, question: "The thief _____ by the police.", options: ["A) caught", "B) was caught", "C) catches", "D) catching"], answer: "B" },
      { id: 10, question: "The essay must _____ by Friday.", options: ["A) submit", "B) be submitted", "C) submitted", "D) submitting"], answer: "B" },
    ],
  },
  {
    topicId: "word-order",
    title: "Word Order",
    questions: [
      { id: 1, question: "Choose the correct order: She / always / comes / early", options: ["A) She always comes early", "B) Always she comes early", "C) She comes always early", "D) Early she always comes"], answer: "A" },
      { id: 2, question: "Never _____ such a beautiful sunset.", options: ["A) I have seen", "B) have I seen", "C) I seen have", "D) seen have I"], answer: "B" },
      { id: 3, question: "Not only _____ but also sings.", options: ["A) she dances", "B) does she dance", "C) she does dance", "D) dancing she"], answer: "B" },
      { id: 4, question: "Hardly _____ when it started raining.", options: ["A) we left", "B) had we left", "C) we had left", "D) left we"], answer: "B" },
      { id: 5, question: "The blue beautiful old vase... Choose the correct order:", options: ["A) the beautiful old blue vase", "B) the old beautiful blue vase", "C) the blue old beautiful vase", "D) the beautiful blue old vase"], answer: "A" },
      { id: 6, question: "Only after finishing _____ leave.", options: ["A) can you", "B) you can", "C) you could", "D) could you"], answer: "A" },
      { id: 7, question: "Seldom _____ such dedication.", options: ["A) I see", "B) do I see", "C) I do see", "D) see I"], answer: "B" },
      { id: 8, question: "At no time _____ alone.", options: ["A) the child was", "B) was the child", "C) the child is", "D) is child the"], answer: "B" },
      { id: 9, question: "So quickly _____ that I missed it.", options: ["A) he ran", "B) did he run", "C) ran he", "D) he did run"], answer: "B" },
      { id: 10, question: "Under no circumstances _____ this.", options: ["A) you should do", "B) should you do", "C) you do should", "D) do you should"], answer: "B" },
    ],
  },
  {
    topicId: "parallel-structure",
    title: "Parallel Structure",
    questions: [
      { id: 1, question: "She likes swimming, hiking, and _____.", options: ["A) to run", "B) running", "C) run", "D) runs"], answer: "B" },
      { id: 2, question: "The report was clear, concise, and _____.", options: ["A) informatively", "B) informative", "C) information", "D) informed"], answer: "B" },
      { id: 3, question: "He neither studies nor _____ homework.", options: ["A) doing", "B) does", "C) to do", "D) done"], answer: "B" },
      { id: 4, question: "Both the teacher and _____ were present.", options: ["A) student", "B) the student", "C) students", "D) a student"], answer: "B" },
      { id: 5, question: "Not only did she win but also _____ a record.", options: ["A) breaking", "B) broke", "C) to break", "D) breaks"], answer: "B" },
      { id: 6, question: "The job requires typing, filing, and _____.", options: ["A) answer phones", "B) answering phones", "C) to answer phones", "D) answers phones"], answer: "B" },
      { id: 7, question: "She is intelligent, hardworking, and _____.", options: ["A) creativity", "B) creative", "C) creates", "D) creating"], answer: "B" },
      { id: 8, question: "I want to read, to write, and _____.", options: ["A) learning", "B) to learn", "C) learn", "D) learned"], answer: "B" },
      { id: 9, question: "Either study hard or _____ the consequences.", options: ["A) facing", "B) face", "C) to face", "D) faced"], answer: "B" },
      { id: 10, question: "The movie was long, boring, and _____.", options: ["A) predictably", "B) predictable", "C) prediction", "D) predict"], answer: "B" },
    ],
  },
  {
    topicId: "modifiers",
    title: "Modifiers & Comparisons",
    questions: [
      { id: 1, question: "She runs _____ than her brother.", options: ["A) more fast", "B) faster", "C) more faster", "D) fastest"], answer: "B" },
      { id: 2, question: "This is _____ book I have ever read.", options: ["A) the more interesting", "B) the most interesting", "C) more interesting", "D) most interesting"], answer: "B" },
      { id: 3, question: "He works _____ carefully than before.", options: ["A) more", "B) most", "C) much", "D) very"], answer: "A" },
      { id: 4, question: "The _____ you study, the better you perform.", options: ["A) much", "B) more", "C) most", "D) many"], answer: "B" },
      { id: 5, question: "This problem is _____ difficult than that one.", options: ["A) more", "B) less", "C) most", "D) Both A and B"], answer: "D" },
      { id: 6, question: "She is _____ as tall as her mother.", options: ["A) so", "B) as", "C) more", "D) most"], answer: "B" },
      { id: 7, question: "Of the three sisters, she is _____.", options: ["A) taller", "B) the tallest", "C) more tall", "D) tall"], answer: "B" },
      { id: 8, question: "This restaurant is _____ expensive of all.", options: ["A) the less", "B) the least", "C) less", "D) least"], answer: "B" },
      { id: 9, question: "Her essay is _____ better than mine.", options: ["A) more", "B) much", "C) very", "D) most"], answer: "B" },
      { id: 10, question: "He drives _____ carefully of all drivers.", options: ["A) most", "B) the most", "C) more", "D) much"], answer: "B" },
    ],
  },
];

// ============================================
// TOEFL READING QUESTIONS
// ============================================

export const toeflReadingQuestions: TopicQuestions[] = [
  {
    topicId: "passage-1",
    title: "Passage 1: The Industrial Revolution",
    questions: [
      { id: 1, question: "When did the Industrial Revolution begin?", options: ["A) Early 17th century", "B) Mid-18th century", "C) Early 19th century", "D) Late 19th century"], answer: "B" },
      { id: 2, question: "Where did the Industrial Revolution originate?", options: ["A) Germany", "B) France", "C) Great Britain", "D) United States"], answer: "C" },
      { id: 3, question: "What invention is credited with starting the revolution?", options: ["A) Steam engine", "B) Spinning jenny", "C) Cotton gin", "D) Printing press"], answer: "A" },
      { id: 4, question: "What was a major consequence for workers?", options: ["A) Higher wages", "B) Better working conditions", "C) Urbanization", "D) More leisure time"], answer: "C" },
      { id: 5, question: "Which industry was first affected?", options: ["A) Steel", "B) Textile", "C) Mining", "D) Agriculture"], answer: "B" },
      { id: 6, question: "What energy source replaced water power?", options: ["A) Electricity", "B) Nuclear", "C) Steam/Coal", "D) Wind"], answer: "C" },
      { id: 7, question: "What transportation innovation emerged?", options: ["A) Automobiles", "B) Railroads", "C) Airplanes", "D) Steamships only"], answer: "B" },
      { id: 8, question: "What social problem arose from industrialization?", options: ["A) Child labor", "B) Overpopulation", "C) Environmental damage", "D) All of the above"], answer: "D" },
      { id: 9, question: "When did the Second Industrial Revolution occur?", options: ["A) 1760-1840", "B) 1840-1870", "C) 1870-1914", "D) 1914-1945"], answer: "C" },
      { id: 10, question: "What characterized the Second Industrial Revolution?", options: ["A) Steam power", "B) Electricity and steel", "C) Textiles", "D) Water power"], answer: "B" },
    ],
  },
  {
    topicId: "passage-2",
    title: "Passage 2: Marine Ecosystems",
    questions: [
      { id: 1, question: "What percentage of Earth's surface is covered by oceans?", options: ["A) About 50%", "B) About 60%", "C) About 70%", "D) About 80%"], answer: "C" },
      { id: 2, question: "What is the primary producer in marine ecosystems?", options: ["A) Fish", "B) Phytoplankton", "C) Coral", "D) Seaweed"], answer: "B" },
      { id: 3, question: "What is coral bleaching caused by?", options: ["A) Pollution", "B) Rising temperatures", "C) Overfishing", "D) Acidification"], answer: "B" },
      { id: 4, question: "What is the twilight zone in the ocean?", options: ["A) 0-200m", "B) 200-1000m", "C) 1000-4000m", "D) Below 4000m"], answer: "B" },
      { id: 5, question: "Which ocean zone receives sunlight?", options: ["A) Aphotic zone", "B) Bathypelagic", "C) Euphotic zone", "D) Abyssal zone"], answer: "C" },
      { id: 6, question: "What threatens marine biodiversity most?", options: ["A) Natural cycles", "B) Human activities", "C) Volcanic activity", "D) Meteor impacts"], answer: "B" },
      { id: 7, question: "What is ocean acidification?", options: ["A) pH decrease from CO2", "B) Oil spill effects", "C) Plastic pollution", "D) Thermal pollution"], answer: "A" },
      { id: 8, question: "What are marine protected areas?", options: ["A) Fishing zones", "B) Conservation zones", "C) Shipping lanes", "D) Military zones"], answer: "B" },
      { id: 9, question: "What role do mangroves play?", options: ["A) Tourism", "B) Coastal protection", "C) Mining", "D) Farming"], answer: "B" },
      { id: 10, question: "What is the Great Barrier Reef composed of?", options: ["A) Volcanic rock", "B) Living coral organisms", "C) Sand deposits", "D) Limestone"], answer: "B" },
    ],
  },
  {
    topicId: "passage-3",
    title: "Passage 3: Ancient Civilizations",
    questions: [
      { id: 1, question: "Where did the first civilizations emerge?", options: ["A) Near rivers", "B) On mountains", "C) In deserts", "D) By the sea"], answer: "A" },
      { id: 2, question: "What is Mesopotamia known as?", options: ["A) Land of Kings", "B) Cradle of Civilization", "C) Ancient World", "D) River Valley"], answer: "B" },
      { id: 3, question: "What writing system did Sumerians develop?", options: ["A) Hieroglyphics", "B) Cuneiform", "C) Sanskrit", "D) Alphabet"], answer: "B" },
      { id: 4, question: "What did ancient Egyptians build?", options: ["A) Ziggurats", "B) Colosseum", "C) Pyramids", "D) Great Wall"], answer: "C" },
      { id: 5, question: "What river was crucial to Egypt?", options: ["A) Tigris", "B) Euphrates", "C) Nile", "D) Ganges"], answer: "C" },
      { id: 6, question: "What was the Indus Valley known for?", options: ["A) Military conquests", "B) Urban planning", "C) Iron working", "D) Democracy"], answer: "B" },
      { id: 7, question: "Where was ancient China's first dynasty?", options: ["A) Yangtze River", "B) Yellow River", "C) Pearl River", "D) Mekong"], answer: "B" },
      { id: 8, question: "What invention came from ancient China?", options: ["A) Wheel", "B) Paper", "C) Alphabet", "D) Iron tools"], answer: "B" },
      { id: 9, question: "What was the Silk Road?", options: ["A) A river", "B) Trade route", "C) A dynasty", "D) A religion"], answer: "B" },
      { id: 10, question: "What ended many ancient civilizations?", options: ["A) Climate change", "B) Invasions", "C) Disease", "D) All factors"], answer: "D" },
    ],
  },
  {
    topicId: "passage-4",
    title: "Passage 4: Climate Change",
    questions: [
      { id: 1, question: "What is the primary cause of current climate change?", options: ["A) Solar activity", "B) Volcanic eruptions", "C) Human activities", "D) Ocean currents"], answer: "C" },
      { id: 2, question: "What is the greenhouse effect?", options: ["A) Plant growth", "B) Heat trapping by gases", "C) Ocean warming", "D) Ozone depletion"], answer: "B" },
      { id: 3, question: "Which gas contributes most to warming?", options: ["A) Oxygen", "B) Nitrogen", "C) Carbon dioxide", "D) Hydrogen"], answer: "C" },
      { id: 4, question: "What is happening to sea levels?", options: ["A) Falling", "B) Rising", "C) Stable", "D) Fluctuating"], answer: "B" },
      { id: 5, question: "What causes sea level rise?", options: ["A) Ice melting", "B) Thermal expansion", "C) Both A and B", "D) Earthquakes"], answer: "C" },
      { id: 6, question: "What is the Paris Agreement?", options: ["A) Trade deal", "B) Climate accord", "C) Military treaty", "D) Cultural exchange"], answer: "B" },
      { id: 7, question: "What are extreme weather events?", options: ["A) Normal patterns", "B) Hurricanes, droughts", "C) Seasonal changes", "D) Mild weather"], answer: "B" },
      { id: 8, question: "What is carbon footprint?", options: ["A) Physical mark", "B) Emissions measure", "C) Forest area", "D) Population size"], answer: "B" },
      { id: 9, question: "What solution is emphasized?", options: ["A) Renewable energy", "B) More fossil fuels", "C) Deforestation", "D) Ignoring issue"], answer: "A" },
      { id: 10, question: "What is the 2°C target?", options: ["A) Daily temperature", "B) Warming limit goal", "C) Ocean temperature", "D) Room temperature"], answer: "B" },
    ],
  },
  {
    topicId: "passage-5",
    title: "Passage 5: Psychology of Learning",
    questions: [
      { id: 1, question: "What is behaviorism focused on?", options: ["A) Mental processes", "B) Observable behavior", "C) Dreams", "D) Emotions"], answer: "B" },
      { id: 2, question: "Who conducted the Pavlov experiments?", options: ["A) Skinner", "B) Pavlov", "C) Watson", "D) Freud"], answer: "B" },
      { id: 3, question: "What is classical conditioning?", options: ["A) Teaching method", "B) Learning through association", "C) Memory technique", "D) Motivation theory"], answer: "B" },
      { id: 4, question: "What is operant conditioning?", options: ["A) Learning by consequences", "B) Imitation", "C) Insight learning", "D) Memorization"], answer: "A" },
      { id: 5, question: "What is positive reinforcement?", options: ["A) Punishment", "B) Reward for behavior", "C) Neutral response", "D) Ignoring"], answer: "B" },
      { id: 6, question: "What is cognitive learning theory?", options: ["A) Behavior only", "B) Mental processes in learning", "C) Physical skills", "D) Instinct"], answer: "B" },
      { id: 7, question: "What is metacognition?", options: ["A) Fast thinking", "B) Thinking about thinking", "C) Forgetting", "D) Sleeping"], answer: "B" },
      { id: 8, question: "What affects learning retention?", options: ["A) Spaced practice", "B) Massed practice", "C) No practice", "D) Random practice"], answer: "A" },
      { id: 9, question: "What is the zone of proximal development?", options: ["A) Comfort zone", "B) Learning potential area", "C) Physical space", "D) Testing area"], answer: "B" },
      { id: 10, question: "Who proposed multiple intelligences?", options: ["A) Piaget", "B) Gardner", "C) Skinner", "D) Vygotsky"], answer: "B" },
    ],
  },
  {
    topicId: "passage-6",
    title: "Passage 6: Space Exploration",
    questions: [
      { id: 1, question: "When was Sputnik launched?", options: ["A) 1947", "B) 1957", "C) 1967", "D) 1977"], answer: "B" },
      { id: 2, question: "Who was the first human in space?", options: ["A) Neil Armstrong", "B) Yuri Gagarin", "C) John Glenn", "D) Buzz Aldrin"], answer: "B" },
      { id: 3, question: "When did humans first land on the Moon?", options: ["A) 1959", "B) 1969", "C) 1979", "D) 1989"], answer: "B" },
      { id: 4, question: "What is the ISS?", options: ["A) Satellite", "B) Space station", "C) Rocket", "D) Telescope"], answer: "B" },
      { id: 5, question: "What planet has rovers explored it?", options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Saturn"], answer: "B" },
      { id: 6, question: "What is the Hubble?", options: ["A) Rover", "B) Space telescope", "C) Rocket", "D) Space station"], answer: "B" },
      { id: 7, question: "What is SpaceX known for?", options: ["A) Moon landing", "B) Reusable rockets", "C) Space station", "D) Satellite TV"], answer: "B" },
      { id: 8, question: "What is NASA's Artemis program?", options: ["A) Mars mission", "B) Return to Moon", "C) Jupiter exploration", "D) Space station"], answer: "B" },
      { id: 9, question: "What is a light-year?", options: ["A) Time unit", "B) Distance unit", "C) Speed unit", "D) Energy unit"], answer: "B" },
      { id: 10, question: "What is the goal of exoplanet research?", options: ["A) Mining", "B) Finding habitable worlds", "C) Tourism", "D) Military"], answer: "B" },
    ],
  },
  {
    topicId: "passage-7",
    title: "Passage 7: Art History",
    questions: [
      { id: 1, question: "What characterized Renaissance art?", options: ["A) Abstract forms", "B) Realism and perspective", "C) Minimalism", "D) Cubism"], answer: "B" },
      { id: 2, question: "Who painted the Sistine Chapel ceiling?", options: ["A) Da Vinci", "B) Michelangelo", "C) Raphael", "D) Botticelli"], answer: "B" },
      { id: 3, question: "What is the Mona Lisa known for?", options: ["A) Size", "B) Mysterious smile", "C) Colors", "D) Religious theme"], answer: "B" },
      { id: 4, question: "What movement followed Impressionism?", options: ["A) Renaissance", "B) Post-Impressionism", "C) Baroque", "D) Gothic"], answer: "B" },
      { id: 5, question: "Who founded Cubism?", options: ["A) Monet", "B) Picasso and Braque", "C) Van Gogh", "D) Matisse"], answer: "B" },
      { id: 6, question: "What is Abstract Expressionism?", options: ["A) Realistic art", "B) Non-representational art", "C) Portrait art", "D) Landscape art"], answer: "B" },
      { id: 7, question: "Who created 'The Starry Night'?", options: ["A) Monet", "B) Van Gogh", "C) Picasso", "D) Dali"], answer: "B" },
      { id: 8, question: "What is Pop Art associated with?", options: ["A) Nature", "B) Popular culture", "C) Religion", "D) War"], answer: "B" },
      { id: 9, question: "Who is known for soup can paintings?", options: ["A) Picasso", "B) Warhol", "C) Pollock", "D) Basquiat"], answer: "B" },
      { id: 10, question: "What is contemporary art?", options: ["A) Ancient art", "B) Art from late 20th century to now", "C) Medieval art", "D) Classical art"], answer: "B" },
    ],
  },
  {
    topicId: "passage-8",
    title: "Passage 8: Economic Systems",
    questions: [
      { id: 1, question: "What is a market economy?", options: ["A) Government-controlled", "B) Supply and demand driven", "C) Traditional system", "D) Barter system"], answer: "B" },
      { id: 2, question: "What characterizes a command economy?", options: ["A) Free markets", "B) Central planning", "C) No government", "D) Competition"], answer: "B" },
      { id: 3, question: "What is GDP?", options: ["A) Government debt", "B) Total economic output", "C) Population", "D) Tax rate"], answer: "B" },
      { id: 4, question: "What is inflation?", options: ["A) Price decrease", "B) Price increase over time", "C) Unemployment", "D) Trade deficit"], answer: "B" },
      { id: 5, question: "What is a recession?", options: ["A) Economic growth", "B) Economic decline", "C) Inflation", "D) Trade surplus"], answer: "B" },
      { id: 6, question: "What is fiscal policy?", options: ["A) Bank rates", "B) Government spending/taxes", "C) Trade rules", "D) Currency exchange"], answer: "B" },
      { id: 7, question: "What is monetary policy?", options: ["A) Tax changes", "B) Central bank actions", "C) Trade agreements", "D) Government spending"], answer: "B" },
      { id: 8, question: "What is globalization?", options: ["A) Local trade", "B) Worldwide economic integration", "C) Nationalism", "D) Isolation"], answer: "B" },
      { id: 9, question: "What is supply and demand?", options: ["A) Government control", "B) Market price mechanism", "C) Fixed prices", "D) Rationing"], answer: "B" },
      { id: 10, question: "What is a mixed economy?", options: ["A) Pure capitalism", "B) Combination of systems", "C) Pure socialism", "D) Feudalism"], answer: "B" },
    ],
  },
];

// ============================================
// IELTS LISTENING QUESTIONS
// ============================================

export const ieltsListeningQuestions: TopicQuestions[] = [
  {
    topicId: "social-needs",
    title: "Social Needs",
    questions: [
      { id: 1, question: "What type of service is the caller inquiring about?", options: ["A) Library membership", "B) Gym membership", "C) Club registration", "D) Community center activities"], answer: "D" },
      { id: 2, question: "What day is the yoga class held?", options: ["A) Monday", "B) Tuesday", "C) Wednesday", "D) Thursday"], answer: "C" },
      { id: 3, question: "How much is the monthly fee for seniors?", options: ["A) $15", "B) $20", "C) $25", "D) $30"], answer: "B" },
      { id: 4, question: "What time does the center open on weekends?", options: ["A) 8:00 AM", "B) 9:00 AM", "C) 10:00 AM", "D) 11:00 AM"], answer: "C" },
      { id: 5, question: "What ID is required for registration?", options: ["A) Passport", "B) Driver's license", "C) Utility bill", "D) Any photo ID"], answer: "D" },
      { id: 6, question: "Which activity is fully booked?", options: ["A) Swimming", "B) Art class", "C) Dance class", "D) Cooking class"], answer: "B" },
      { id: 7, question: "What is the maximum class size?", options: ["A) 10 people", "B) 15 people", "C) 20 people", "D) 25 people"], answer: "C" },
      { id: 8, question: "Where is the center located?", options: ["A) Downtown", "B) Near the park", "C) By the station", "D) In the mall"], answer: "B" },
      { id: 9, question: "What special event is coming up?", options: ["A) Open day", "B) Anniversary celebration", "C) Charity event", "D) Sports tournament"], answer: "A" },
      { id: 10, question: "How can one get more information?", options: ["A) Visit in person", "B) Call the hotline", "C) Check the website", "D) All of the above"], answer: "D" },
    ],
  },
  {
    topicId: "accommodation",
    title: "Accommodation & Housing",
    questions: [
      { id: 1, question: "What type of property is available?", options: ["A) Studio apartment", "B) Two-bedroom flat", "C) Shared house", "D) Detached house"], answer: "B" },
      { id: 2, question: "What is the monthly rent?", options: ["A) $800", "B) $950", "C) $1,100", "D) $1,250"], answer: "C" },
      { id: 3, question: "What is included in the rent?", options: ["A) All utilities", "B) Water only", "C) Electricity only", "D) None"], answer: "B" },
      { id: 4, question: "How long is the minimum lease?", options: ["A) 3 months", "B) 6 months", "C) 12 months", "D) 24 months"], answer: "C" },
      { id: 5, question: "What deposit is required?", options: ["A) One month's rent", "B) Two months' rent", "C) Half month's rent", "D) No deposit"], answer: "A" },
      { id: 6, question: "Are pets allowed?", options: ["A) Yes, all pets", "B) Only cats", "C) Only small dogs", "D) No pets"], answer: "D" },
      { id: 7, question: "What floor is the apartment on?", options: ["A) Ground floor", "B) Second floor", "C) Third floor", "D) Top floor"], answer: "C" },
      { id: 8, question: "Is parking available?", options: ["A) Yes, free", "B) Yes, extra cost", "C) Street parking only", "D) No parking"], answer: "B" },
      { id: 9, question: "When is the property available?", options: ["A) Immediately", "B) Next week", "C) Next month", "D) In three months"], answer: "C" },
      { id: 10, question: "What is nearby?", options: ["A) Schools", "B) Shopping center", "C) Public transport", "D) All of these"], answer: "D" },
    ],
  },
  {
    topicId: "travel-tourism",
    title: "Travel & Tourism",
    questions: [
      { id: 1, question: "What type of tour is being discussed?", options: ["A) City tour", "B) Nature tour", "C) Food tour", "D) Historical tour"], answer: "B" },
      { id: 2, question: "How long is the tour?", options: ["A) Half day", "B) Full day", "C) Two days", "D) One week"], answer: "B" },
      { id: 3, question: "What is included in the price?", options: ["A) Transport only", "B) Meals only", "C) Both transport and lunch", "D) Nothing"], answer: "C" },
      { id: 4, question: "What time does the tour depart?", options: ["A) 7:00 AM", "B) 8:30 AM", "C) 9:00 AM", "D) 10:00 AM"], answer: "B" },
      { id: 5, question: "Where is the meeting point?", options: ["A) Hotel lobby", "B) Central station", "C) Tourist office", "D) Airport"], answer: "C" },
      { id: 6, question: "What should visitors bring?", options: ["A) Comfortable shoes", "B) Sunscreen", "C) Water bottle", "D) All of these"], answer: "D" },
      { id: 7, question: "How many stops are on the tour?", options: ["A) Three", "B) Four", "C) Five", "D) Six"], answer: "C" },
      { id: 8, question: "What is the group size limit?", options: ["A) 10 people", "B) 15 people", "C) 20 people", "D) 30 people"], answer: "B" },
      { id: 9, question: "Is there a child discount?", options: ["A) No discount", "B) 25% off", "C) 50% off", "D) Free for under 5"], answer: "C" },
      { id: 10, question: "What is the cancellation policy?", options: ["A) No refunds", "B) 24-hour notice", "C) 48-hour notice", "D) Flexible"], answer: "C" },
    ],
  },
  {
    topicId: "health-fitness",
    title: "Health & Fitness",
    questions: [
      { id: 1, question: "What facility is being described?", options: ["A) Hospital", "B) Spa", "C) Fitness center", "D) Pharmacy"], answer: "C" },
      { id: 2, question: "What is the annual membership fee?", options: ["A) $300", "B) $400", "C) $500", "D) $600"], answer: "C" },
      { id: 3, question: "What classes are offered?", options: ["A) Yoga", "B) Spinning", "C) Swimming", "D) All of these"], answer: "D" },
      { id: 4, question: "What time does the pool close?", options: ["A) 8 PM", "B) 9 PM", "C) 10 PM", "D) 11 PM"], answer: "C" },
      { id: 5, question: "Is personal training available?", options: ["A) No", "B) Yes, included", "C) Yes, extra fee", "D) Only for premium"], answer: "C" },
      { id: 6, question: "What is the minimum age requirement?", options: ["A) 14 years", "B) 16 years", "C) 18 years", "D) No minimum"], answer: "B" },
      { id: 7, question: "Are lockers provided?", options: ["A) Yes, free", "B) Yes, rental fee", "C) Bring your own", "D) No lockers"], answer: "A" },
      { id: 8, question: "What is the trial period?", options: ["A) 3 days", "B) 7 days", "C) 14 days", "D) 30 days"], answer: "B" },
      { id: 9, question: "Which day is the gym closed?", options: ["A) Sunday", "B) Monday", "C) No closing day", "D) Public holidays only"], answer: "D" },
      { id: 10, question: "What equipment is newest?", options: ["A) Treadmills", "B) Weight machines", "C) Rowing machines", "D) Ellipticals"], answer: "A" },
    ],
  },
  {
    topicId: "education-training",
    title: "Education & Training",
    questions: [
      { id: 1, question: "What course is being advertised?", options: ["A) Language course", "B) Computer course", "C) Management course", "D) First aid course"], answer: "B" },
      { id: 2, question: "How long is the program?", options: ["A) 4 weeks", "B) 8 weeks", "C) 12 weeks", "D) 16 weeks"], answer: "C" },
      { id: 3, question: "What is the schedule?", options: ["A) Daily", "B) Twice weekly", "C) Weekends only", "D) Online anytime"], answer: "B" },
      { id: 4, question: "What certificate is awarded?", options: ["A) Diploma", "B) Certificate of completion", "C) Degree", "D) No certificate"], answer: "B" },
      { id: 5, question: "What is the course fee?", options: ["A) $200", "B) $350", "C) $450", "D) $600"], answer: "C" },
      { id: 6, question: "Are materials included?", options: ["A) Yes, all materials", "B) Textbook only", "C) Software only", "D) Nothing included"], answer: "A" },
      { id: 7, question: "What is the class size?", options: ["A) Maximum 8", "B) Maximum 12", "C) Maximum 20", "D) No limit"], answer: "B" },
      { id: 8, question: "Is prior experience required?", options: ["A) Yes, advanced", "B) Yes, basic", "C) No experience needed", "D) Assessment required"], answer: "C" },
      { id: 9, question: "When does the next session start?", options: ["A) Next Monday", "B) Next month", "C) In two weeks", "D) Immediately"], answer: "B" },
      { id: 10, question: "What is the payment option?", options: ["A) Full upfront", "B) Monthly installments", "C) Both options", "D) After completion"], answer: "C" },
    ],
  },
  {
    topicId: "environment",
    title: "Environment & Nature",
    questions: [
      { id: 1, question: "What environmental issue is discussed?", options: ["A) Air pollution", "B) Water conservation", "C) Wildlife protection", "D) Recycling"], answer: "B" },
      { id: 2, question: "What percentage of water is wasted?", options: ["A) 10%", "B) 20%", "C) 30%", "D) 40%"], answer: "C" },
      { id: 3, question: "What solution is proposed?", options: ["A) New dams", "B) Rainwater harvesting", "C) Desalination", "D) All of these"], answer: "B" },
      { id: 4, question: "Which sector uses most water?", options: ["A) Domestic", "B) Industrial", "C) Agricultural", "D) Commercial"], answer: "C" },
      { id: 5, question: "What is the campaign called?", options: ["A) Save Water", "B) Blue Planet", "C) Water Wise", "D) Aqua Conservation"], answer: "C" },
      { id: 6, question: "When was it launched?", options: ["A) Last year", "B) This month", "C) Five years ago", "D) Ten years ago"], answer: "A" },
      { id: 7, question: "What incentive is offered?", options: ["A) Tax reduction", "B) Free equipment", "C) Cash reward", "D) Certificate"], answer: "A" },
      { id: 8, question: "How much water can be saved per household?", options: ["A) 10 liters daily", "B) 30 liters daily", "C) 50 liters daily", "D) 100 liters daily"], answer: "C" },
      { id: 9, question: "What app is mentioned?", options: ["A) Water Tracker", "B) Eco Monitor", "C) Green Living", "D) Save Earth"], answer: "A" },
      { id: 10, question: "What is the goal by next year?", options: ["A) 10% reduction", "B) 20% reduction", "C) 30% reduction", "D) 50% reduction"], answer: "B" },
    ],
  },
  {
    topicId: "academic-discussion",
    title: "Academic Discussion",
    questions: [
      { id: 1, question: "What is the research topic?", options: ["A) Climate effects", "B) Social media impact", "C) Economic trends", "D) Medical advances"], answer: "B" },
      { id: 2, question: "How many participants were surveyed?", options: ["A) 100", "B) 500", "C) 1,000", "D) 5,000"], answer: "C" },
      { id: 3, question: "What age group was studied?", options: ["A) Children", "B) Teenagers", "C) Adults", "D) Elderly"], answer: "B" },
      { id: 4, question: "What method was used?", options: ["A) Interviews", "B) Questionnaires", "C) Observation", "D) Both A and B"], answer: "D" },
      { id: 5, question: "What was the main finding?", options: ["A) Positive effects", "B) Negative effects", "C) Mixed results", "D) No significant effect"], answer: "C" },
      { id: 6, question: "How long did the study take?", options: ["A) 3 months", "B) 6 months", "C) 1 year", "D) 2 years"], answer: "C" },
      { id: 7, question: "What limitation is mentioned?", options: ["A) Sample size", "B) Time frame", "C) Geographic focus", "D) All of these"], answer: "D" },
      { id: 8, question: "What future research is suggested?", options: ["A) Larger sample", "B) Different age groups", "C) Longer duration", "D) All of these"], answer: "D" },
      { id: 9, question: "Where will results be published?", options: ["A) Journal", "B) Conference", "C) Online platform", "D) All of these"], answer: "A" },
      { id: 10, question: "When is the deadline for the paper?", options: ["A) Next week", "B) Next month", "C) In three months", "D) End of semester"], answer: "B" },
    ],
  },
  {
    topicId: "lecture-science",
    title: "Lecture: Science",
    questions: [
      { id: 1, question: "What scientific field is covered?", options: ["A) Physics", "B) Chemistry", "C) Biology", "D) Astronomy"], answer: "D" },
      { id: 2, question: "What phenomenon is explained?", options: ["A) Black holes", "B) Solar eclipses", "C) Northern lights", "D) Meteor showers"], answer: "A" },
      { id: 3, question: "Who first theorized about this?", options: ["A) Newton", "B) Einstein", "C) Hawking", "D) Galileo"], answer: "B" },
      { id: 4, question: "What happens at the event horizon?", options: ["A) Time slows", "B) Light escapes", "C) Nothing special", "D) Matter expands"], answer: "A" },
      { id: 5, question: "How are black holes detected?", options: ["A) Direct observation", "B) X-ray emissions", "C) Gravitational effects", "D) Both B and C"], answer: "D" },
      { id: 6, question: "What is the nearest black hole?", options: ["A) 100 light years", "B) 1,000 light years", "C) 10,000 light years", "D) 1 million light years"], answer: "B" },
      { id: 7, question: "What is Hawking radiation?", options: ["A) Light from stars", "B) Energy from black holes", "C) Cosmic rays", "D) Radio waves"], answer: "B" },
      { id: 8, question: "What is a supermassive black hole?", options: ["A) Very dense", "B) At galaxy centers", "C) Recently formed", "D) Near Earth"], answer: "B" },
      { id: 9, question: "What technology studies these?", options: ["A) Telescopes", "B) Satellites", "C) Gravitational wave detectors", "D) All of these"], answer: "D" },
      { id: 10, question: "What remains unknown?", options: ["A) Their existence", "B) What's inside", "C) Their location", "D) Their size"], answer: "B" },
    ],
  },
  {
    topicId: "lecture-history",
    title: "Lecture: History",
    questions: [
      { id: 1, question: "What historical event is discussed?", options: ["A) World War I", "B) World War II", "C) Cold War", "D) Industrial Revolution"], answer: "C" },
      { id: 2, question: "When did this period begin?", options: ["A) 1945", "B) 1947", "C) 1950", "D) 1955"], answer: "B" },
      { id: 3, question: "Which countries were involved?", options: ["A) USA and UK", "B) USA and USSR", "C) Germany and Japan", "D) China and India"], answer: "B" },
      { id: 4, question: "What was the iron curtain?", options: ["A) A wall", "B) Political division", "C) Military alliance", "D) Trade barrier"], answer: "B" },
      { id: 5, question: "What crisis occurred in 1962?", options: ["A) Berlin Crisis", "B) Cuban Missile Crisis", "C) Korean War", "D) Vietnam War"], answer: "B" },
      { id: 6, question: "What policy was containment?", options: ["A) Economic", "B) Military", "C) Political strategy", "D) Cultural exchange"], answer: "C" },
      { id: 7, question: "What was the space race?", options: ["A) Military competition", "B) Technological competition", "C) Economic competition", "D) Cultural competition"], answer: "B" },
      { id: 8, question: "When did the Cold War end?", options: ["A) 1985", "B) 1989", "C) 1991", "D) 1995"], answer: "C" },
      { id: 9, question: "What symbolized its end?", options: ["A) Treaty signing", "B) Fall of Berlin Wall", "C) Olympic games", "D) Summit meeting"], answer: "B" },
      { id: 10, question: "What legacy remains?", options: ["A) Nuclear weapons", "B) Political tensions", "C) Space technology", "D) All of these"], answer: "D" },
    ],
  },
  {
    topicId: "lecture-business",
    title: "Lecture: Business",
    questions: [
      { id: 1, question: "What business concept is explained?", options: ["A) Marketing", "B) Finance", "C) Entrepreneurship", "D) Management"], answer: "C" },
      { id: 2, question: "What is a startup?", options: ["A) Large corporation", "B) New business venture", "C) Government agency", "D) Non-profit"], answer: "B" },
      { id: 3, question: "What is venture capital?", options: ["A) Bank loan", "B) Investment in startups", "C) Government grant", "D) Personal savings"], answer: "B" },
      { id: 4, question: "What is an MVP?", options: ["A) Most Valuable Person", "B) Minimum Viable Product", "C) Maximum Value Proposition", "D) Marketing Value Plan"], answer: "B" },
      { id: 5, question: "What is a business model?", options: ["A) Company structure", "B) How profit is made", "C) Marketing strategy", "D) Product design"], answer: "B" },
      { id: 6, question: "What percentage of startups fail?", options: ["A) 50%", "B) 70%", "C) 90%", "D) 30%"], answer: "C" },
      { id: 7, question: "What is pivoting?", options: ["A) Closing business", "B) Changing direction", "C) Expanding markets", "D) Reducing costs"], answer: "B" },
      { id: 8, question: "What is scaling?", options: ["A) Downsizing", "B) Growing operations", "C) Cutting costs", "D) Hiring staff"], answer: "B" },
      { id: 9, question: "What makes entrepreneurs successful?", options: ["A) Luck", "B) Persistence", "C) Money", "D) Connections"], answer: "B" },
      { id: 10, question: "What is an exit strategy?", options: ["A) Business closure", "B) Plan for leaving/selling", "C) Bankruptcy", "D) Retirement plan"], answer: "B" },
    ],
  },
];

// ============================================
// IELTS READING QUESTIONS
// ============================================

export const ieltsReadingQuestions: TopicQuestions[] = [
  {
    topicId: "science-tech",
    title: "Science & Technology",
    questions: [
      { id: 1, question: "What is the main topic of the passage?", options: ["A) Artificial intelligence", "B) Renewable energy", "C) Space exploration", "D) Genetic engineering"], answer: "A" },
      { id: 2, question: "When was the first AI program created?", options: ["A) 1940s", "B) 1950s", "C) 1960s", "D) 1970s"], answer: "B" },
      { id: 3, question: "What is machine learning?", options: ["A) Human instruction", "B) Learning from data", "C) Programming", "D) Hardware design"], answer: "B" },
      { id: 4, question: "What industry first adopted AI?", options: ["A) Healthcare", "B) Finance", "C) Manufacturing", "D) Entertainment"], answer: "C" },
      { id: 5, question: "What concern is raised about AI?", options: ["A) Cost", "B) Job displacement", "C) Energy use", "D) Complexity"], answer: "B" },
      { id: 6, question: "What is deep learning?", options: ["A) Basic programming", "B) Neural network approach", "C) Surface learning", "D) Memory storage"], answer: "B" },
      { id: 7, question: "What breakthrough occurred recently?", options: ["A) Faster processors", "B) Natural language processing", "C) Cheaper computers", "D) New programming"], answer: "B" },
      { id: 8, question: "What ethical issue is mentioned?", options: ["A) Privacy", "B) Cost", "C) Speed", "D) Accessibility"], answer: "A" },
      { id: 9, question: "What future development is predicted?", options: ["A) AI replacing all jobs", "B) Human-AI collaboration", "C) AI ban", "D) Slower development"], answer: "B" },
      { id: 10, question: "What is the author's tone?", options: ["A) Pessimistic", "B) Optimistic", "C) Neutral", "D) Critical"], answer: "C" },
    ],
  },
  {
    topicId: "history-archaeology",
    title: "History & Archaeology",
    questions: [
      { id: 1, question: "What ancient site is discussed?", options: ["A) Pompeii", "B) Machu Picchu", "C) Stonehenge", "D) Angkor Wat"], answer: "A" },
      { id: 2, question: "When was this site destroyed?", options: ["A) 49 AD", "B) 79 AD", "C) 99 AD", "D) 179 AD"], answer: "B" },
      { id: 3, question: "What caused its destruction?", options: ["A) Earthquake", "B) Flood", "C) Volcanic eruption", "D) War"], answer: "C" },
      { id: 4, question: "When was it rediscovered?", options: ["A) 1599", "B) 1699", "C) 1748", "D) 1848"], answer: "C" },
      { id: 5, question: "What preserved the site?", options: ["A) Ice", "B) Sand", "C) Volcanic ash", "D) Water"], answer: "C" },
      { id: 6, question: "What was found there?", options: ["A) Gold", "B) Everyday artifacts", "C) Weapons", "D) Only buildings"], answer: "B" },
      { id: 7, question: "How many people lived there?", options: ["A) 5,000", "B) 11,000", "C) 20,000", "D) 50,000"], answer: "B" },
      { id: 8, question: "What technique helped study it?", options: ["A) Excavation", "B) Plaster casts", "C) Carbon dating", "D) All of these"], answer: "D" },
      { id: 9, question: "What challenges exist today?", options: ["A) Tourism damage", "B) Weather erosion", "C) Funding", "D) All of these"], answer: "D" },
      { id: 10, question: "What is the site's status now?", options: ["A) Closed", "B) UNESCO World Heritage", "C) Private property", "D) Under excavation only"], answer: "B" },
    ],
  },
  {
    topicId: "biology-nature",
    title: "Biology & Nature",
    questions: [
      { id: 1, question: "What species is discussed?", options: ["A) Elephants", "B) Whales", "C) Tigers", "D) Gorillas"], answer: "B" },
      { id: 2, question: "How do they communicate?", options: ["A) Visual signals", "B) Sound waves", "C) Chemical signals", "D) Touch"], answer: "B" },
      { id: 3, question: "How far can their calls travel?", options: ["A) 10 km", "B) 50 km", "C) 100 km", "D) 1000 km"], answer: "D" },
      { id: 4, question: "What is their migration distance?", options: ["A) 100 km", "B) 1,000 km", "C) 5,000 km", "D) 10,000 km"], answer: "D" },
      { id: 5, question: "What threatens their population?", options: ["A) Hunting", "B) Pollution", "C) Climate change", "D) All of these"], answer: "D" },
      { id: 6, question: "What conservation effort is mentioned?", options: ["A) Captive breeding", "B) Marine sanctuaries", "C) Hunting bans", "D) All of these"], answer: "B" },
      { id: 7, question: "How long can they hold their breath?", options: ["A) 10 minutes", "B) 30 minutes", "C) 60 minutes", "D) 90 minutes"], answer: "D" },
      { id: 8, question: "What do they primarily eat?", options: ["A) Fish", "B) Plankton", "C) Squid", "D) Varies by species"], answer: "D" },
      { id: 9, question: "What is their lifespan?", options: ["A) 20-30 years", "B) 40-50 years", "C) 70-90 years", "D) Over 100 years"], answer: "C" },
      { id: 10, question: "What unique feature is highlighted?", options: ["A) Size", "B) Intelligence", "C) Complex songs", "D) Speed"], answer: "C" },
    ],
  },
  {
    topicId: "psychology",
    title: "Psychology & Behavior",
    questions: [
      { id: 1, question: "What psychological concept is explored?", options: ["A) Memory", "B) Motivation", "C) Personality", "D) Intelligence"], answer: "A" },
      { id: 2, question: "What types of memory exist?", options: ["A) Short and long term", "B) Visual only", "C) Auditory only", "D) One type"], answer: "A" },
      { id: 3, question: "How long does short-term memory last?", options: ["A) Seconds", "B) Minutes", "C) Hours", "D) Days"], answer: "A" },
      { id: 4, question: "What improves memory retention?", options: ["A) Repetition", "B) Sleep", "C) Association", "D) All of these"], answer: "D" },
      { id: 5, question: "What is the forgetting curve?", options: ["A) Memory improvement", "B) Rate of forgetting", "C) Learning speed", "D) Age-related decline"], answer: "B" },
      { id: 6, question: "Who developed it?", options: ["A) Freud", "B) Jung", "C) Ebbinghaus", "D) Pavlov"], answer: "C" },
      { id: 7, question: "What is procedural memory?", options: ["A) Facts", "B) Skills and habits", "C) Events", "D) Emotions"], answer: "B" },
      { id: 8, question: "What affects memory negatively?", options: ["A) Stress", "B) Lack of sleep", "C) Aging", "D) All of these"], answer: "D" },
      { id: 9, question: "What is a mnemonic device?", options: ["A) Medical tool", "B) Memory aid technique", "C) Psychological test", "D) Brain scan"], answer: "B" },
      { id: 10, question: "What is false memory?", options: ["A) Forgotten memory", "B) Inaccurate recollection", "C) Suppressed memory", "D) Childhood memory"], answer: "B" },
    ],
  },
  {
    topicId: "economics",
    title: "Economics & Business",
    questions: [
      { id: 1, question: "What economic concept is discussed?", options: ["A) Inflation", "B) Globalization", "C) Unemployment", "D) Taxation"], answer: "B" },
      { id: 2, question: "When did globalization accelerate?", options: ["A) 1950s", "B) 1970s", "C) 1990s", "D) 2000s"], answer: "C" },
      { id: 3, question: "What enabled this acceleration?", options: ["A) Internet", "B) Transportation", "C) Trade agreements", "D) All of these"], answer: "D" },
      { id: 4, question: "What is a benefit mentioned?", options: ["A) Lower prices", "B) More choices", "C) Economic growth", "D) All of these"], answer: "D" },
      { id: 5, question: "What criticism is raised?", options: ["A) Job losses", "B) Income inequality", "C) Cultural homogenization", "D) All of these"], answer: "D" },
      { id: 6, question: "What is outsourcing?", options: ["A) Internal hiring", "B) Moving operations abroad", "C) Automation", "D) Downsizing"], answer: "B" },
      { id: 7, question: "Which region gained most jobs?", options: ["A) North America", "B) Europe", "C) Asia", "D) Africa"], answer: "C" },
      { id: 8, question: "What is a trade deficit?", options: ["A) Exporting more", "B) Importing more", "C) Equal trade", "D) No trade"], answer: "B" },
      { id: 9, question: "What trend is emerging?", options: ["A) More globalization", "B) Deglobalization", "C) Status quo", "D) Regional focus"], answer: "D" },
      { id: 10, question: "What future is predicted?", options: ["A) Complete reversal", "B) Continued but modified", "C) Unchanged", "D) Collapse"], answer: "B" },
    ],
  },
  {
    topicId: "arts-culture",
    title: "Arts & Culture",
    questions: [
      { id: 1, question: "What art form is discussed?", options: ["A) Music", "B) Dance", "C) Cinema", "D) Theatre"], answer: "C" },
      { id: 2, question: "When did cinema begin?", options: ["A) 1870s", "B) 1890s", "C) 1910s", "D) 1930s"], answer: "B" },
      { id: 3, question: "Who are the Lumière brothers?", options: ["A) Actors", "B) Cinema pioneers", "C) Writers", "D) Musicians"], answer: "B" },
      { id: 4, question: "When did sound films arrive?", options: ["A) 1907", "B) 1917", "C) 1927", "D) 1937"], answer: "C" },
      { id: 5, question: "What was the Golden Age?", options: ["A) 1920s", "B) 1930s-1950s", "C) 1960s", "D) 1980s"], answer: "B" },
      { id: 6, question: "What changed in the 1960s?", options: ["A) Color films", "B) New wave movements", "C) 3D technology", "D) Digital cameras"], answer: "B" },
      { id: 7, question: "What impact did TV have?", options: ["A) Increased cinema attendance", "B) Decreased attendance", "C) No impact", "D) Made cinema obsolete"], answer: "B" },
      { id: 8, question: "What is the blockbuster era?", options: ["A) 1960s", "B) 1970s onwards", "C) 1990s", "D) 2000s"], answer: "B" },
      { id: 9, question: "What technology changed cinema recently?", options: ["A) VHS", "B) DVD", "C) Digital/Streaming", "D) Radio"], answer: "C" },
      { id: 10, question: "What is cinema's future challenge?", options: ["A) Cost", "B) Competition from streaming", "C) Lack of talent", "D) Government regulation"], answer: "B" },
    ],
  },
  {
    topicId: "health-medicine",
    title: "Health & Medicine",
    questions: [
      { id: 1, question: "What medical topic is covered?", options: ["A) Heart disease", "B) Mental health", "C) Vaccines", "D) Cancer"], answer: "C" },
      { id: 2, question: "When was the first vaccine developed?", options: ["A) 1696", "B) 1796", "C) 1896", "D) 1996"], answer: "B" },
      { id: 3, question: "Who developed it?", options: ["A) Pasteur", "B) Jenner", "C) Fleming", "D) Koch"], answer: "B" },
      { id: 4, question: "What disease did it prevent?", options: ["A) Polio", "B) Measles", "C) Smallpox", "D) Flu"], answer: "C" },
      { id: 5, question: "What is herd immunity?", options: ["A) Individual protection", "B) Community protection", "C) Animal immunity", "D) Natural immunity"], answer: "B" },
      { id: 6, question: "What percentage is needed for herd immunity?", options: ["A) 50-60%", "B) 70-80%", "C) 80-95%", "D) 100%"], answer: "C" },
      { id: 7, question: "What disease was eradicated?", options: ["A) Polio", "B) Measles", "C) Smallpox", "D) Malaria"], answer: "C" },
      { id: 8, question: "What is vaccine hesitancy?", options: ["A) Side effects", "B) Reluctance to vaccinate", "C) Shortage", "D) Cost concerns"], answer: "B" },
      { id: 9, question: "What technology is new in vaccines?", options: ["A) Traditional methods", "B) mRNA technology", "C) Herbal remedies", "D) Antibiotics"], answer: "B" },
      { id: 10, question: "What is the author's conclusion?", options: ["A) Vaccines are dangerous", "B) Vaccines are unnecessary", "C) Vaccines are crucial", "D) Vaccines need more testing"], answer: "C" },
    ],
  },
  {
    topicId: "education",
    title: "Education Systems",
    questions: [
      { id: 1, question: "What education topic is discussed?", options: ["A) Traditional vs modern", "B) Online learning", "C) Standardized testing", "D) All of these"], answer: "B" },
      { id: 2, question: "When did online learning emerge?", options: ["A) 1980s", "B) 1990s", "C) 2000s", "D) 2010s"], answer: "B" },
      { id: 3, question: "What accelerated its adoption?", options: ["A) Technology", "B) COVID-19", "C) Cost savings", "D) All of these"], answer: "D" },
      { id: 4, question: "What is a MOOC?", options: ["A) Private course", "B) Massive Open Online Course", "C) Military training", "D) Medical program"], answer: "B" },
      { id: 5, question: "What advantage is mentioned?", options: ["A) Flexibility", "B) Accessibility", "C) Cost-effectiveness", "D) All of these"], answer: "D" },
      { id: 6, question: "What disadvantage is noted?", options: ["A) Lack of interaction", "B) Self-discipline needed", "C) Technical issues", "D) All of these"], answer: "D" },
      { id: 7, question: "What is blended learning?", options: ["A) Only online", "B) Only in-person", "C) Combination", "D) Self-study"], answer: "C" },
      { id: 8, question: "What skill is crucial for online learners?", options: ["A) Time management", "B) Athletic ability", "C) Social skills", "D) Artistic talent"], answer: "A" },
      { id: 9, question: "What is the digital divide?", options: ["A) Age gap", "B) Technology access inequality", "C) Learning speed", "D) Content difference"], answer: "B" },
      { id: 10, question: "What is the future prediction?", options: ["A) Online only", "B) Return to traditional", "C) Hybrid model", "D) No change"], answer: "C" },
    ],
  },
  {
    topicId: "environment-climate",
    title: "Environment & Climate",
    questions: [
      { id: 1, question: "What environmental issue is addressed?", options: ["A) Deforestation", "B) Plastic pollution", "C) Air quality", "D) Water scarcity"], answer: "B" },
      { id: 2, question: "How much plastic is produced annually?", options: ["A) 100 million tons", "B) 300 million tons", "C) 500 million tons", "D) 1 billion tons"], answer: "B" },
      { id: 3, question: "What percentage is recycled?", options: ["A) Less than 10%", "B) About 25%", "C) About 50%", "D) Over 75%"], answer: "A" },
      { id: 4, question: "What is a microplastic?", options: ["A) Large debris", "B) Tiny plastic fragments", "C) Biodegradable plastic", "D) Recycled material"], answer: "B" },
      { id: 5, question: "Where is the Great Pacific Garbage Patch?", options: ["A) Atlantic Ocean", "B) Pacific Ocean", "C) Indian Ocean", "D) Arctic Ocean"], answer: "B" },
      { id: 6, question: "How does plastic affect marine life?", options: ["A) Ingestion", "B) Entanglement", "C) Habitat destruction", "D) All of these"], answer: "D" },
      { id: 7, question: "What is a proposed solution?", options: ["A) Ban all plastic", "B) Better recycling", "C) Alternative materials", "D) Both B and C"], answer: "D" },
      { id: 8, question: "Which countries have banned single-use plastics?", options: ["A) None", "B) Few countries", "C) Many countries", "D) All countries"], answer: "C" },
      { id: 9, question: "What is biodegradable plastic?", options: ["A) Indestructible", "B) Naturally decomposing", "C) Recyclable only", "D) Cheaper option"], answer: "B" },
      { id: 10, question: "What individual action is suggested?", options: ["A) Use reusables", "B) Reduce consumption", "C) Proper disposal", "D) All of these"], answer: "D" },
    ],
  },
  {
    topicId: "sociology",
    title: "Sociology & Society",
    questions: [
      { id: 1, question: "What social phenomenon is explored?", options: ["A) Urbanization", "B) Aging population", "C) Migration", "D) Social media"], answer: "A" },
      { id: 2, question: "What percentage lives in cities now?", options: ["A) 35%", "B) 45%", "C) 55%", "D) 65%"], answer: "C" },
      { id: 3, question: "What is projected by 2050?", options: ["A) 50%", "B) 60%", "C) 70%", "D) 80%"], answer: "C" },
      { id: 4, question: "What drives urbanization?", options: ["A) Job opportunities", "B) Education", "C) Healthcare", "D) All of these"], answer: "D" },
      { id: 5, question: "What challenge does urbanization create?", options: ["A) Housing shortage", "B) Traffic congestion", "C) Pollution", "D) All of these"], answer: "D" },
      { id: 6, question: "What is a megacity?", options: ["A) Any capital city", "B) City with 10M+ population", "C) Modern city", "D) Coastal city"], answer: "B" },
      { id: 7, question: "How many megacities exist?", options: ["A) About 10", "B) About 20", "C) About 35", "D) About 50"], answer: "C" },
      { id: 8, question: "What is urban planning?", options: ["A) City design and management", "B) Rural development", "C) Tourism promotion", "D) Historical preservation"], answer: "A" },
      { id: 9, question: "What concept is gaining popularity?", options: ["A) Suburban sprawl", "B) Smart cities", "C) Rural migration", "D) Industrial zones"], answer: "B" },
      { id: 10, question: "What balance is needed?", options: ["A) Growth and sustainability", "B) Old and new", "C) Rich and poor", "D) Work and life"], answer: "A" },
    ],
  },
];

// ============================================
// IELTS WRITING QUESTIONS (Prompts)
// ============================================

export interface WritingPrompt {
  id: number;
  taskType: "Task 1" | "Task 2";
  prompt: string;
  wordCount: number;
  tips: string[];
}

export interface WritingTopicQuestions {
  topicId: string;
  title: string;
  prompts: WritingPrompt[];
}

export const ieltsWritingQuestions: WritingTopicQuestions[] = [
  {
    topicId: "task1-line",
    title: "Task 1: Line Graph",
    prompts: [
      {
        id: 1,
        taskType: "Task 1" as const,
        prompt: "The line graph illustrates the number of visitors to three London museums between 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        wordCount: 150,
        tips: ["Identify the overall trend", "Compare data points", "Use appropriate tenses", "Include an overview statement"]
      }
    ],
  },
  {
    topicId: "task1-bar",
    title: "Task 1: Bar Chart",
    prompts: [
      {
        id: 1,
        taskType: "Task 1" as const,
        prompt: "The bar chart shows the percentage of adults who exercised regularly in five countries in 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        wordCount: 150,
        tips: ["Compare categories", "Highlight significant differences", "Use comparison language", "Start with an overview"]
      }
    ],
  },
  {
    topicId: "task1-pie",
    title: "Task 1: Pie Chart",
    prompts: [
      {
        id: 1,
        taskType: "Task 1" as const,
        prompt: "The pie charts show the main reasons for studying abroad in 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        wordCount: 150,
        tips: ["Compare proportions", "Note significant changes", "Use fractions and percentages", "Describe both charts"]
      }
    ],
  },
  {
    topicId: "task1-table",
    title: "Task 1: Table",
    prompts: [
      {
        id: 1,
        taskType: "Task 1" as const,
        prompt: "The table shows the number of students enrolled in different subjects at a university over three years. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        wordCount: 150,
        tips: ["Select key data", "Make comparisons", "Organize logically", "Don't describe every number"]
      }
    ],
  },
  {
    topicId: "task1-process",
    title: "Task 1: Process Diagram",
    prompts: [
      {
        id: 1,
        taskType: "Task 1" as const,
        prompt: "The diagram shows the process of making chocolate from cocoa beans. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        wordCount: 150,
        tips: ["Use passive voice", "Show sequence clearly", "Include all stages", "Use sequencing words (first, then, finally)"]
      }
    ],
  },
  {
    topicId: "task1-map",
    title: "Task 1: Map",
    prompts: [
      {
        id: 1,
        taskType: "Task 1" as const,
        prompt: "The maps show changes to a town center between 1990 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        wordCount: 150,
        tips: ["Describe locations", "Show changes", "Use location vocabulary", "Compare the two time periods"]
      }
    ],
  },
  {
    topicId: "task2-opinion",
    title: "Task 2: Opinion Essay",
    prompts: [
      {
        id: 1,
        taskType: "Task 2" as const,
        prompt: "Some people believe that children should start formal education at a very early age, while others think they should not go to school until they are older. Discuss both views and give your own opinion.",
        wordCount: 250,
        tips: ["State your position clearly", "Support with examples", "Write a balanced conclusion", "Address both views before giving opinion"]
      }
    ],
  },
  {
    topicId: "task2-discussion",
    title: "Task 2: Discussion Essay",
    prompts: [
      {
        id: 1,
        taskType: "Task 2" as const,
        prompt: "Some people prefer to spend their lives doing the same things and avoiding change. Others, however, think that change is always a good thing. Discuss both these views and give your own opinion.",
        wordCount: 250,
        tips: ["Present both sides fairly", "Give your opinion in conclusion", "Use linking words", "Provide specific examples for each view"]
      }
    ],
  },
  {
    topicId: "task2-problem",
    title: "Task 2: Problem-Solution",
    prompts: [
      {
        id: 1,
        taskType: "Task 2" as const,
        prompt: "In many countries, plastic bags are causing serious environmental problems. What are the problems associated with plastic bags? What solutions can you suggest to address these issues?",
        wordCount: 250,
        tips: ["Identify clear problems", "Propose realistic solutions", "Explain cause and effect", "Give specific examples"]
      }
    ],
  },
  {
    topicId: "task2-advantage",
    title: "Task 2: Advantage-Disadvantage",
    prompts: [
      {
        id: 1,
        taskType: "Task 2" as const,
        prompt: "More and more people are working from home rather than in an office. What are the advantages and disadvantages of this trend for both employees and employers?",
        wordCount: 250,
        tips: ["Balance advantages and disadvantages", "Give specific examples", "State your overall view", "Consider multiple perspectives"]
      }
    ],
  },
];

// ============================================
// HELPER FUNCTION
// ============================================

export function getQuestionsByTopicId(
  examType: "toefl" | "ielts",
  section: string,
  topicId: string
): SimulationQuestion[] | WritingPrompt[] | undefined {
  if (examType === "toefl") {
    if (section === "listening") {
      return toeflListeningQuestions.find(t => t.topicId === topicId)?.questions;
    } else if (section === "structure") {
      return toeflStructureQuestions.find(t => t.topicId === topicId)?.questions;
    } else if (section === "reading") {
      return toeflReadingQuestions.find(t => t.topicId === topicId)?.questions;
    }
  } else if (examType === "ielts") {
    if (section === "listening") {
      return ieltsListeningQuestions.find(t => t.topicId === topicId)?.questions;
    } else if (section === "reading") {
      return ieltsReadingQuestions.find(t => t.topicId === topicId)?.questions;
    } else if (section === "writing") {
      return ieltsWritingQuestions.find(t => t.topicId === topicId)?.prompts;
    }
  }
  return undefined;
}

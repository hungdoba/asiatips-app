-- CreateTable
CREATE TABLE "jlpt_mondai" (
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "mondai_number" DECIMAL NOT NULL,
    "mondai_content" TEXT NOT NULL,
    "note" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "jlpt_mondai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jlpt_question" (
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "mondai_number" DECIMAL NOT NULL,
    "question_number" INTEGER NOT NULL,
    "question_content" TEXT,
    "option_1" TEXT,
    "option_2" TEXT,
    "option_3" TEXT,
    "option_4" TEXT,
    "answer" INTEGER NOT NULL,
    "explaination" TEXT,
    "note" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "jlpt_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jlpt_chokai" (
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "mondai_number" INTEGER NOT NULL,
    "question_number" INTEGER NOT NULL,
    "option_1" TEXT,
    "option_2" TEXT,
    "option_3" TEXT,
    "option_4" TEXT,
    "script" TEXT NOT NULL,
    "audio_url" TEXT,
    "answer" INTEGER,
    "explain" TEXT,
    "note" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "chokai_pkey" PRIMARY KEY ("id")
);

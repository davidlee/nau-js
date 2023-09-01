--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Homebrew)
-- Dumped by pg_dump version 15.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: davidlee
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO davidlee;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: davidlee
--

COMMENT ON SCHEMA public IS '';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: EntryType; Type: TYPE; Schema: public; Owner: davidlee
--

CREATE TYPE public."EntryType" AS ENUM (
    'Transient',
    'Note',
    'Area',
    'Objective',
    'Project',
    'Task'
);


ALTER TYPE public."EntryType" OWNER TO davidlee;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: davidlee
--

CREATE TYPE public."Status" AS ENUM (
    'Capture',
    'Draft',
    'Rework',
    'Clarify',
    'Incubate',
    'Backlog',
    'Icebox',
    'Ready',
    'Next',
    'Started',
    'Check',
    'Done',
    'Reflect',
    'Stalled',
    'Aborted',
    'Archive',
    'Deleted'
);


ALTER TYPE public."Status" OWNER TO davidlee;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Entry; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public."Entry" (
    id integer NOT NULL,
    path text,
    "entryType" public."EntryType" DEFAULT 'Transient'::public."EntryType" NOT NULL,
    "position" integer DEFAULT 1 NOT NULL,
    status public."Status" DEFAULT 'Draft'::public."Status" NOT NULL,
    text text NOT NULL,
    url text,
    "filePath" text,
    meta jsonb,
    priority integer DEFAULT 0 NOT NULL,
    urgency double precision DEFAULT 1.0 NOT NULL,
    due timestamp(3) without time zone,
    "end" timestamp(3) without time zone,
    scheduled timestamp(3) without time zone,
    until timestamp(3) without time zone,
    wait timestamp(3) without time zone,
    start timestamp(3) without time zone,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted timestamp(3) without time zone,
    "jobAt" timestamp(3) without time zone,
    "nodeId" integer,
    "recurConfig" jsonb,
    "repeatConfig" jsonb,
    "reviewConfig" jsonb
);


ALTER TABLE public."Entry" OWNER TO davidlee;

--
-- Name: Entry_id_seq; Type: SEQUENCE; Schema: public; Owner: davidlee
--

CREATE SEQUENCE public."Entry_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Entry_id_seq" OWNER TO davidlee;

--
-- Name: Entry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davidlee
--

ALTER SEQUENCE public."Entry_id_seq" OWNED BY public."Entry".id;


--
-- Name: Node; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public."Node" (
    id integer NOT NULL,
    path text NOT NULL,
    depth integer NOT NULL,
    numchild integer DEFAULT 0 NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Node" OWNER TO davidlee;

--
-- Name: Node_id_seq; Type: SEQUENCE; Schema: public; Owner: davidlee
--

CREATE SEQUENCE public."Node_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Node_id_seq" OWNER TO davidlee;

--
-- Name: Node_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davidlee
--

ALTER SEQUENCE public."Node_id_seq" OWNED BY public."Node".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "entryId" integer NOT NULL
);


ALTER TABLE public."Review" OWNER TO davidlee;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: davidlee
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Review_id_seq" OWNER TO davidlee;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davidlee
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Tag; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public."Tag" (
    id integer NOT NULL,
    path text NOT NULL,
    depth integer NOT NULL,
    numchild integer DEFAULT 0 NOT NULL,
    name public.citext NOT NULL,
    "group" public.citext DEFAULT 'default'::public.citext NOT NULL
);


ALTER TABLE public."Tag" OWNER TO davidlee;

--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: davidlee
--

CREATE SEQUENCE public."Tag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tag_id_seq" OWNER TO davidlee;

--
-- Name: Tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davidlee
--

ALTER SEQUENCE public."Tag_id_seq" OWNED BY public."Tag".id;


--
-- Name: Update; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public."Update" (
    id integer NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    changes jsonb NOT NULL,
    "entryId" integer NOT NULL
);


ALTER TABLE public."Update" OWNER TO davidlee;

--
-- Name: Update_id_seq; Type: SEQUENCE; Schema: public; Owner: davidlee
--

CREATE SEQUENCE public."Update_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Update_id_seq" OWNER TO davidlee;

--
-- Name: Update_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davidlee
--

ALTER SEQUENCE public."Update_id_seq" OWNED BY public."Update".id;


--
-- Name: _Depends; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public."_Depends" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_Depends" OWNER TO davidlee;

--
-- Name: _EntryToTag; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public."_EntryToTag" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_EntryToTag" OWNER TO davidlee;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: davidlee
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO davidlee;

--
-- Name: Entry id; Type: DEFAULT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Entry" ALTER COLUMN id SET DEFAULT nextval('public."Entry_id_seq"'::regclass);


--
-- Name: Node id; Type: DEFAULT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Node" ALTER COLUMN id SET DEFAULT nextval('public."Node_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Tag id; Type: DEFAULT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN id SET DEFAULT nextval('public."Tag_id_seq"'::regclass);


--
-- Name: Update id; Type: DEFAULT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Update" ALTER COLUMN id SET DEFAULT nextval('public."Update_id_seq"'::regclass);


--
-- Data for Name: Entry; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public."Entry" (id, path, "entryType", "position", status, text, url, "filePath", meta, priority, urgency, due, "end", scheduled, until, wait, start, created, modified, deleted, "jobAt", "nodeId", "recurConfig", "repeatConfig", "reviewConfig") FROM stdin;
\.


--
-- Data for Name: Node; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public."Node" (id, path, depth, numchild, name) FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public."Review" (id, created, "entryId") FROM stdin;
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public."Tag" (id, path, depth, numchild, name, "group") FROM stdin;
\.


--
-- Data for Name: Update; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public."Update" (id, created, changes, "entryId") FROM stdin;
\.


--
-- Data for Name: _Depends; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public."_Depends" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _EntryToTag; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public."_EntryToTag" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: davidlee
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6291bc43-1791-44f8-9ba1-95eb5b508b47	2dc7c720c008f5f2ea34d280761276feb87ff2de551ad0d03a902f92036336a0	2023-09-01 15:23:03.622056+10	20230826145647_initial_dev_migration	\N	\N	2023-09-01 15:23:03.569785+10	1
2baf0d2a-cb95-40b6-8a51-fed035bd09f5	537af47d10a8436497875eebf3a361ba6059405c95c65d204b72da53f11c1f0e	2023-09-01 15:23:03.691041+10	20230826235024_adding_relations	\N	\N	2023-09-01 15:23:03.622809+10	1
c0c4e85c-30a9-40a4-bd66-e1b311c0a765	4c24879a3207315ed5f0d78837c3c946ec05f9b6b119db1c5949830d619e1666	2023-09-01 15:23:20.233752+10	20230901052320_rejiggery	\N	\N	2023-09-01 15:23:20.218427+10	1
\.


--
-- Name: Entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davidlee
--

SELECT pg_catalog.setval('public."Entry_id_seq"', 1, false);


--
-- Name: Node_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davidlee
--

SELECT pg_catalog.setval('public."Node_id_seq"', 1, false);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davidlee
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, false);


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davidlee
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 1, false);


--
-- Name: Update_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davidlee
--

SELECT pg_catalog.setval('public."Update_id_seq"', 1, false);


--
-- Name: Entry Entry_pkey; Type: CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Entry"
    ADD CONSTRAINT "Entry_pkey" PRIMARY KEY (id);


--
-- Name: Node Node_pkey; Type: CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Node"
    ADD CONSTRAINT "Node_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: Update Update_pkey; Type: CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Update"
    ADD CONSTRAINT "Update_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Entry_entryType_idx; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE INDEX "Entry_entryType_idx" ON public."Entry" USING btree ("entryType");


--
-- Name: Entry_nodeId_key; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "Entry_nodeId_key" ON public."Entry" USING btree ("nodeId");


--
-- Name: Entry_path_idx; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE INDEX "Entry_path_idx" ON public."Entry" USING btree (path);


--
-- Name: Entry_path_key; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "Entry_path_key" ON public."Entry" USING btree (path);


--
-- Name: Entry_status_idx; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE INDEX "Entry_status_idx" ON public."Entry" USING btree (status);


--
-- Name: Node_name_key; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "Node_name_key" ON public."Node" USING btree (name);


--
-- Name: Node_path_key; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "Node_path_key" ON public."Node" USING btree (path);


--
-- Name: Tag_name_group_idx; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE INDEX "Tag_name_group_idx" ON public."Tag" USING btree (name, "group");


--
-- Name: Tag_name_key; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);


--
-- Name: Tag_path_idx; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE INDEX "Tag_path_idx" ON public."Tag" USING btree (path);


--
-- Name: Tag_path_key; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "Tag_path_key" ON public."Tag" USING btree (path);


--
-- Name: _Depends_AB_unique; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "_Depends_AB_unique" ON public."_Depends" USING btree ("A", "B");


--
-- Name: _Depends_B_index; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE INDEX "_Depends_B_index" ON public."_Depends" USING btree ("B");


--
-- Name: _EntryToTag_AB_unique; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE UNIQUE INDEX "_EntryToTag_AB_unique" ON public."_EntryToTag" USING btree ("A", "B");


--
-- Name: _EntryToTag_B_index; Type: INDEX; Schema: public; Owner: davidlee
--

CREATE INDEX "_EntryToTag_B_index" ON public."_EntryToTag" USING btree ("B");


--
-- Name: Entry Entry_nodeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Entry"
    ADD CONSTRAINT "Entry_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES public."Node"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Review Review_entryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES public."Entry"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Update Update_entryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."Update"
    ADD CONSTRAINT "Update_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES public."Entry"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _Depends _Depends_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."_Depends"
    ADD CONSTRAINT "_Depends_A_fkey" FOREIGN KEY ("A") REFERENCES public."Entry"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _Depends _Depends_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."_Depends"
    ADD CONSTRAINT "_Depends_B_fkey" FOREIGN KEY ("B") REFERENCES public."Entry"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _EntryToTag _EntryToTag_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."_EntryToTag"
    ADD CONSTRAINT "_EntryToTag_A_fkey" FOREIGN KEY ("A") REFERENCES public."Entry"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _EntryToTag _EntryToTag_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davidlee
--

ALTER TABLE ONLY public."_EntryToTag"
    ADD CONSTRAINT "_EntryToTag_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: davidlee
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--


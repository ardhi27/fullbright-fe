CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_orders_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_orders_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: exam_results; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exam_results (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    exam_type text NOT NULL,
    exam_mode text NOT NULL,
    package_level text,
    total_score numeric,
    section_scores jsonb,
    answers jsonb,
    time_spent integer,
    completed_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT exam_results_exam_mode_check CHECK ((exam_mode = ANY (ARRAY['simulasi'::text, 'final'::text]))),
    CONSTRAINT exam_results_exam_type_check CHECK ((exam_type = ANY (ARRAY['ielts'::text, 'toefl'::text])))
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id text NOT NULL,
    user_email text NOT NULL,
    package_type text NOT NULL,
    package_level text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT orders_package_type_check CHECK ((package_type = ANY (ARRAY['IELTS'::text, 'TOEFL'::text]))),
    CONSTRAINT orders_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'paid'::text, 'expired'::text, 'cancelled'::text])))
);


--
-- Name: exam_results exam_results_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_results
    ADD CONSTRAINT exam_results_pkey PRIMARY KEY (id);


--
-- Name: orders orders_order_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_id_key UNIQUE (order_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: idx_exam_results_completed_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_exam_results_completed_at ON public.exam_results USING btree (completed_at DESC);


--
-- Name: idx_exam_results_exam_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_exam_results_exam_type ON public.exam_results USING btree (exam_type);


--
-- Name: idx_exam_results_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_exam_results_user_id ON public.exam_results USING btree (user_id);


--
-- Name: orders update_orders_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_orders_updated_at();


--
-- Name: orders Anyone can read orders by order_id; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can read orders by order_id" ON public.orders FOR SELECT USING (true);


--
-- Name: orders Service role can manage orders; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Service role can manage orders" ON public.orders USING (true) WITH CHECK (true);


--
-- Name: exam_results Users can insert their own exam results; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own exam results" ON public.exam_results FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: exam_results Users can view their own exam results; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own exam results" ON public.exam_results FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: exam_results; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

--
-- Name: orders; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;
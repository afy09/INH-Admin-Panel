import Beranda from "@/components/Charts/page";
import { Metadata } from "next";
import { fetchBerandaBerita } from "../api/beranda/getNewsBeranda";
import { fetchBerandaCampaign } from "../api/beranda/getCampaignBeranda";
import { fetchBerandaProgram } from "../api/beranda/getProgramBeranda";

export const metadata: Metadata = {
  title: "Admin Panel INH ",
};

export default async function Page() {
  const berandaCampaign = await fetchBerandaCampaign();
  const berandaBerita = await fetchBerandaBerita();
  const berandaProgram = await fetchBerandaProgram();
  return (
    <>
      <Beranda berandaCampaign={berandaCampaign} berandaBerita={berandaBerita} berandaProgram={berandaProgram} />
    </>
  );
}

export const dynamic = "force-dynamic";

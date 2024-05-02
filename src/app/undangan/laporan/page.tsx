import * as React from "react";
import type { Metadata } from 'next';
import Breadcrumb from "@/components/global/Breadcrumbs/Breadcrumb";
import LaporanUndanganProps from "./undangan";

export const metadata: Metadata = {
  title: 'Undangan',
  description: 'Undangan',
  icons: [{ rel: 'icon', url: '/logo/Lambang_Kota_Madiun.png' }]
}

const LaporanUndangan = () => {
  return (
    <div className="list-undangan-container relative">
      <Breadcrumb pageName="Undangan" />
      <LaporanUndanganProps />
    </div>
  )
}

export default LaporanUndangan;
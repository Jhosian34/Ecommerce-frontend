import React from 'react';
import './Home.css';
import SectionInfo from '../../components/SectionInfo/SectionInfo';
import SectionProductsFeatured from '../../components/SectionProductsFeatured/SectionProductsFeatured'
import MarcasDestacadas from '../../components/MarcasDestacadas/MarcasDestacadas';
import Servicios from '../../components/SectionService/SectionService';

export default function Home() {
  return (
    <>
      <SectionInfo />
      <SectionProductsFeatured />
      <MarcasDestacadas/>
      <Servicios />
    </>
  );
}

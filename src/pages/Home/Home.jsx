import React from 'react';
import './Home.css';
import SectionInfo from '../../components/SectionInfo/SectionInfo';
import SectionProducts from '../../components/SectionProducts/SectionProducts';
import MarcasDestacadas from '../../components/MarcasDestacadas/MarcasDestacadas';
import Servicios from '../../components/SectionService/SectionService';

export default function Home() {
  return (
    <>
      <SectionInfo />
      <SectionProducts />
      <MarcasDestacadas/>
      <Servicios />
    </>
  );
}

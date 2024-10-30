// import React, { useState } from 'react';
// import './DiseaseManageScreen.css';
// import Sidebar from '../../components/Sidebar';
// import TableComponent from '../../components/DiseaseTableComponent';
// import PaginationComponent from '../../components/PaginationComponent';

// function DiseaseManageScreen() {
//   const diseases= [
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//     { diseaseId: '001', diseaseName: '미란/궤양', diseaseDescription: '피부가 붉어짐', healthGuidance: '알레르기 유발 물질 제거' },
//   ];

//   const [currentPage, setCurrentPage] = useState(1);
//   const diseasesPerPage = 12;
//   const totalPages = Math.ceil(diseases.length / diseasesPerPage);

//   // 현재 페이지의 질환 데이터
//   const indexOfLastDisease = currentPage * diseasesPerPage;
//   const indexOfFirstDisease = indexOfLastDisease - diseasesPerPage;
//   const currentDiseases = diseases.slice(indexOfFirstDisease, indexOfLastDisease);

//   // 페이지 변경 핸들러
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // 테이블 열 정의
//   const columns = ['질환 ID', '질환명', '세부설명', '건강조치'];

//   return (
//     <div className="disease-manage-container">
//       <Sidebar />
//       <main className="disease-manage-content">
//         <h2 className="disease-manage-title">질환 관리</h2>
//         <TableComponent columns={columns} data={currentDiseases}/>
//         <PaginationComponent
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </main>
//     </div>
//   );
// }

// export default DiseaseManageScreen;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DiseaseManageScreen.css';
import Sidebar from '../../components/Sidebar';
import DiseaseTableComponent from '../../components/DiseaseTableComponent';
import PaginationComponent from '../../components/PaginationComponent';

function DiseaseManageScreen() {
  const [diseases, setDiseases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const diseasesPerPage = 12;

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get('http://ceprj.gachon.ac.kr:60017/admin/diseases');
        if (response.data.success) {
          const fetchedDiseases = response.data.diseases.map(disease => ({
            diseaseId: disease.diseaseId,
            diseaseName: disease.diseaseName,
            diseaseDescription: disease.description, 
            healthGuidance: disease.health, 
          }));
          setDiseases(fetchedDiseases);
        } else {
          console.error('질환 데이터를 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };
    fetchDiseases();
  }, []);

  const totalPages = Math.ceil(diseases.length / diseasesPerPage);

  const indexOfLastDisease = currentPage * diseasesPerPage;
  const indexOfFirstDisease = indexOfLastDisease - diseasesPerPage;
  const currentDiseases = diseases.slice(indexOfFirstDisease, indexOfLastDisease);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = ['질환 ID', '질환명', '세부설명', '건강조치'];

  return (
    <div className="disease-manage-container">
      <Sidebar />
      <main className="disease-manage-content">
        <h2 className="disease-manage-title">질환 관리</h2>
        <DiseaseTableComponent columns={columns} data={currentDiseases} />
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}

export default DiseaseManageScreen;


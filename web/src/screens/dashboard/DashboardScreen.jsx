// import React, { useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import './DashboardScreen.css';
// import Sidebar from '../../components/Sidebar';

// ChartJS.register(ArcElement, Tooltip, Legend);

// function DashboardScreen() {
//   const [tooltipText, setTooltipText] = useState("");
//   const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });

//   const showTooltip = (event, text) => {
//     setTooltipText(text);
//     setTooltipStyle({
//       display: "block",
//       top: `${event.pageY + 10}px`,
//       left: `${event.pageX + 10}px`,
//     });
//   };

//   const hideTooltip = () => {
//     setTooltipStyle({ display: "none" });
//   };

//   const data = {
//     labels: ['미란/궤양', '농포/여드름', '태선화/과도색소침착', '결절/종괴', '구진/플라크', '비듬/각질/생피성잔고리', '기타'],
//     datasets: [
//       {
//         label: '질환 태그 수',
//         data: [25, 14, 10, 5, 14, 25, 10],
//         backgroundColor: [
//           '#36A2EB',
//           '#FF6384',
//           '#FFCE56',
//           '#E7E9ED',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//         ],
//         hoverBackgroundColor: [
//           '#36A2EB',
//           '#FF6384',
//           '#FFCE56',
//           '#E7E9ED',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="dashboard-content">
//         <h2 className="dashboard-title">대시보드</h2>

//         <div className="subContainer">
//           <div className="dashboard-cards">
//             <div className="admin-card">
//               <h3>관리자 현황</h3>
//               <p className="admin-text">관리자 | 4</p>
//               <div className="admin-info">
//                 <ul className="list-email">
//                   <li onMouseOver={(e) => showTooltip(e, "hyunwoo011@naver.com")} onMouseOut={hideTooltip}>hyunwoo011@naver.com</li>
//                   <li onMouseOver={(e) => showTooltip(e, "yonghwan02@naver.com")} onMouseOut={hideTooltip}>yonghwan02@naver.com</li>
//                   <li onMouseOver={(e) => showTooltip(e, "eunji03@naver.com")} onMouseOut={hideTooltip}>eunji03@naver.com</li>
//                   <li onMouseOver={(e) => showTooltip(e, "heeyeon04@naver.com")} onMouseOut={hideTooltip}>heeyeon04@naver.com</li>
//                 </ul>
//                 <ul className="list-name">
//                   <li>김현우</li>
//                   <li>최용환</li>
//                   <li>박은지</li>
//                   <li>정희연</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="dashboard-card">
//               <h3>사용자 현황</h3>
//               <div className="textContainer">
//                 <p className="text">현재 가입자 수 </p>
//                 <p className="highlight">12</p>
//               </div>
//             </div>
//             <div className="dashboard-card">
//               <h3>이미지 진단 현황</h3>
//               <div className="textContainer2">
//                 <p className="text">총 진단 횟수</p>
//                 <p className="highlight">8</p>
//               </div>
//             </div>
//           </div>

//           <div className="dashboard-chart">
//             <h3>게시글 작성시 선택된 질환 태그 수</h3>
//             <Pie data={data} />
//           </div>
//         </div>

//         <div className="tooltip" style={tooltipStyle}>{tooltipText}</div>
//       </main>
//     </div>
//   );
// }

// export default DashboardScreen;

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './DashboardScreen.css';
import Sidebar from '../../components/Sidebar';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardScreen() {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });
  const [adminData, setAdminData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [diagnosisCount, setDiagnosisCount] = useState(0);
  const [tagCounts, setTagCounts] = useState({ labels: [], counts: [] });
  const [loading, setLoading] = useState(true);

  const showTooltip = (event, text) => {
    setTooltipText(text);
    setTooltipStyle({
      display: "block",
      top: `${event.pageY + 10}px`,
      left: `${event.pageX + 10}px`,
    });
  };

  const hideTooltip = () => {
    setTooltipStyle({ display: "none" });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://ceprj.gachon.ac.kr:60017/admin/dashboard'); 
      const data = response.data;

      if (data.success) {
        setAdminData(data.admin);
        setUserCount(data.user_count);
        setDiagnosisCount(data.diagnosis_image_count);

        // post_tags에서 labels와 counts를 추출
        const labels = data.post_tags.map((tag) => tag.diseaseTag);
        const counts = data.post_tags.map((tag) => tag.count);
        
        setTagCounts({ labels, counts }); // 상태 업데이트
        console.log("Tag Counts:", { labels, counts }); // 상태 확인
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: tagCounts.labels,  // 라벨 배열을 차트에 적용
    datasets: [
      {
        label: '질환 태그 수',
        data: tagCounts.counts,  // 카운트 배열을 차트에 적용
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#E7E9ED',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#E7E9ED',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <h2 className="dashboard-title">대시보드</h2>

        <div className="subContainer">
          <div className="dashboard-cards">
            <div className="admin-card">
              <h3>관리자 현황</h3>
              <p className="admin-text">관리자 | {adminData.length}</p>
              <div className="admin-info">
                <ul className="list-email">
                  {adminData.map((admin, index) => (
                    <li key={index} onMouseOver={(e) => showTooltip(e, admin.email)} onMouseOut={hideTooltip}>
                      {admin.email}
                    </li>
                  ))}
                </ul>
                <ul className="list-name">
                  {adminData.map((admin, index) => (
                    <li key={index}>{admin.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="dashboard-card">
              <h3>사용자 현황</h3>
              <div className="textContainer">
                <p className="text">현재 가입자 수 </p>
                <p className="highlight">{userCount}</p>
              </div>
            </div>
            <div className="dashboard-card">
              <h3>이미지 진단 현황</h3>
              <div className="textContainer2">
                <p className="text">총 진단 횟수</p>
                <p className="highlight">{diagnosisCount}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-chart">
            <h3>게시글 작성시 선택된 질환 태그 수</h3>
            <Pie data={data} />
          </div>
        </div>

        <div className="tooltip" style={tooltipStyle}>{tooltipText}</div>
      </main>
    </div>
  );
}

export default DashboardScreen;

const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.header-nav a');
window.addEventListener('scroll',()=>{
  let cur='cover';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
  document.getElementById('toTop').classList.toggle('show',window.scrollY>420);
});

/* 프로젝트 상세 팝업 */
const PROJECTS={
  reviewlens:{kind:'대표 프로젝트 · AI · 마케팅 자동화',title:'ReviewLens',img:'images/reviewlens.webp',
    tags:['Python','FastAPI','KoELECTRA','FAISS','Ollama LLM','ALS'],
    rows:[['문제','리뷰 데이터가 별점 확인에만 머물러, 추천·광고 카피·고객 응대에 충분히 활용되지 못했습니다.'],['해결 방향','리뷰 속 강점과 불만 요소를 분석해, 추천 성능 개선과 마케팅 문구 생성을 연결하는 AI 서비스로 확장했습니다.'],['구현','• <b>ABSA</b> 감성분석(F1 0.93)으로 리뷰의 강점·불만 요소 추출<br>• <b>ALS</b> 협업필터링 + 감성 점수 블렌딩으로 추천 성능 개선<br>• <b>FAISS</b> 시맨틱 검색 + RAG로 광고 카피·셀러 응답 생성<br>• <b>FastAPI</b> 추론 서버로 AI 기능을 구성하고 사용자 화면과 연동'],['결과','시간 기반 분할 평가에서 Recall@10을 <b>0.19 → 0.31</b>로 개선했고, <b>Hugging Face Spaces</b>에 Live Demo로 배포했습니다.']],
    github:'https://github.com/dhwldrjekd1/reviewlens-',live:'https://huggingface.co/spaces/dongyuns/reviewlens'},
  straffic:{kind:'교통 AI · 과속·교통 흐름 분석',title:'TAS — 교통 분석 시스템',img:'images/straffic.webp',
    tags:['FastAPI','YOLO11','PaddleOCR','OpenCV','Spring Boot','PostgreSQL','Vue 3','Raspberry Pi'],
    rows:[['문제','교통 영상에서 차량 흐름과 과속 여부를 파악하려면 차량 탐지, 속도 추정, 번호판 OCR, 관제 화면이 하나의 흐름으로 연결되어야 했습니다.'],['해결 방향','라즈베리파이에서 수집한 영상을 FastAPI AI 추론 서버에서 분석하고, Spring Boot·PostgreSQL·Vue 대시보드로 연결해 교통 흐름과 과속 상태를 확인할 수 있도록 설계했습니다.'],['구현','• <b>YOLO11</b>로 차량을 탐지하고 bbox 기반으로 <b>속도 추정</b><br>• 속도 기준을 적용해 <b>과속 여부 판단</b><br>• 이벤트별 <b>best frame</b> 선별 후 번호판 YOLO crop + <b>PaddleOCR</b>로 OCR 처리<br>• 분석 결과를 <b>Spring Boot·PostgreSQL</b>에 저장하고 <b>Vue 관제 대시보드</b>와 연동'],['결과','차량 탐지·번호판 OCR·속도 추정·과속 판단·<b>교통 흐름 확인</b>까지 연결한 교통 관제 AI 서비스를 팀 프로젝트로 구현했습니다.'],['관리자 계정','<code>admin@email.com</code> / <code>1234</code> — 로그인 후 관제 대시보드·이벤트 목록 확인 가능']],
    site:'https://tas.dyy.kr',github:'https://github.com/angela860807/Traffic_Analytics_Proposal'},
  forme:{kind:'커머스 · 팀 프로젝트(팀장)',title:'FORME — 헤리티지 패션 편집숍',img:'images/forme.webp',
    tags:['Vue 3','Pinia','Spring Boot 3.5','Java 21','JWT','PostgreSQL 16','Docker','Toss Pay'],
    rows:[['문제','여러 헤리티지 브랜드를 큐레이션하는 커머스에서, 단순 상품 판매를 넘어 구매 전환과 재방문을 유도하는 서비스 흐름이 필요했습니다.'],['해결 방향','회원 등급, 할인, 사이즈 추천, 관리자 분석 기능을 결합해 구매 전환과 운영 효율을 높이기 위한 풀스택 커머스로 설계했습니다.'],['구현','• <b>회원 등급(Bronze~VIP) 자동 상승</b> 및 등급·시즌 할인 중첩 로직 구현<br>• <b>BMI 기반 사이즈 추천</b>과 KR/UK/EU/US 사이즈 변환 기능 구현<br>• <b>Toss Payments 결제</b>, JWT 인증, 리뷰·Q&A 게시판 구현<br>• <b>관리자 대시보드</b> 구성 (매출·주문·회원·페이지뷰 통계)'],['결과','<b>3인 팀의 팀장</b>으로 기획부터 배포까지 주도했으며, <b>30개 화면·REST API 92개·15개 테이블</b> 규모의 커머스 서비스를 완성했습니다.'],['관리자 계정','<code>admin@forme.com</code> / <code>1234</code> — 로그인 후 대시보드·주문·회원 관리 확인 가능']],
    site:'https://forme.dyy.kr',github:'https://github.com/dhwldrjekd1/FORME_shop_backend'},
  gentlemonster:{kind:'커머스 · 1인 풀스택 구현',title:'Gentle Monster 스타일 쇼핑몰',img:'images/gentlemonster.webp',
    tags:['Spring Boot 3.2','Java 21','Spring Security','PostgreSQL 14','JPA','Swagger','Docker','Vue.js'],
    rows:[['문제','브랜드형 커머스에서 상품 탐색, 주문, 리뷰, 커뮤니티, 관리자 기능을 하나의 서비스 흐름으로 구성해야 했습니다.'],['해결 방향','회원·상품·주문·리뷰·게시판 등 9개 도메인을 직접 설계하고, Spring Boot 백엔드부터 Vue 화면과 Docker 배포까지 1인 풀스택 구조로 구축했습니다.'],['구현','• <b>Spring Security·BCrypt</b> 기반 회원 인증·권한 관리 구현<br>• 구매한 사용자만 작성 가능한 <b>구매검증 리뷰</b> 시스템 구현<br>• 배송정보 → 결제수단 → 확인 <b>3단계 주문·결제 흐름</b> 구현<br>• 상품 재고·할인가·카테고리 관리 및 <b>관리자 기능</b> 구현<br>• <b>11개 테이블</b> 기반 REST API, Swagger 문서화, Docker 배포 구성'],['결과','회원·상품·주문·리뷰·커뮤니티까지 포함한 <b>11개 테이블 규모</b>의 커머스 서비스를 <b>1인 풀스택</b> 프로젝트로 완성했습니다.'],['관리자 계정','<code>admin</code> / <code>1234</code> — 로그인 후 상품·주문·회원 관리 확인 가능']],
    site:'https://gm.dyy.kr',github:'https://github.com/dhwldrjekd1/portfolio_shop_spring_boot'}
};
const overlay=document.getElementById('projectModal');
function openModal(key){
  const p=PROJECTS[key]; if(!p)return;
  document.getElementById('mImg').style.backgroundImage="url('"+p.img+"')";
  document.getElementById('mKind').textContent=p.kind;
  document.getElementById('mTitle').textContent=p.title;
  document.getElementById('mTags').innerHTML=p.tags.map(t=>'<span>'+t+'</span>').join('');
  document.getElementById('mRows').innerHTML=p.rows.map(r=>'<div class="modal-row"><b>'+r[0]+'</b><p>'+r[1]+'</p></div>').join('');
  const siteSvg='<svg class="btn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
  const ghSvg='<svg class="btn-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"/></svg>';
  document.getElementById('mActions').innerHTML=(p.live?'<a class="btn btn-line" href="'+p.live+'" target="_blank" rel="noopener"><img class="btn-ico" src="images/icons/hf-logo.svg" alt="Hugging Face" />Live Demo</a>':'')+(p.site?'<a class="btn btn-line" href="'+p.site+'" target="_blank" rel="noopener">'+siteSvg+'사이트 보기</a>':'')+(p.github?'<a class="btn btn-line" href="'+p.github+'" target="_blank" rel="noopener">'+ghSvg+'GitHub 보기</a>':'<a class="btn btn-line" href="#" onclick="return false;" style="opacity:.6;cursor:default">GitHub 업로드 예정</a>');
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){overlay.classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

/* 스크롤 시 살짝 페이드인 */
(function(){
  const sel='.section-eyebrow,.section-title,.section-sub,.skill-card,.project-card,.featured-project,.profile-card,.intro-card';
  const els=document.querySelectorAll(sel);
  els.forEach(el=>el.classList.add('reveal'));
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('in'));return;}
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
})();

/* 연락처 폼 — Web3Forms 전송 */
(function(){
  const form=document.getElementById('contactForm');
  if(!form)return;
  const status=document.getElementById('formStatus');
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const btn=form.querySelector('button[type=submit]');
    const label=btn.querySelector('.btn-label')||btn;
    const orig=label.textContent;
    btn.disabled=true;label.textContent='보내는 중…';
    status.textContent='';status.className='form-status';
    try{
      const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)});
      const data=await res.json();
      if(data.success){
        status.textContent='메시지가 전송되었습니다. 빠르게 회신드리겠습니다 :)';
        status.classList.add('ok');
        form.reset();
      }else{
        status.textContent='전송에 실패했습니다. 메일로 직접 연락해주세요.';
        status.classList.add('err');
      }
    }catch(err){
      status.textContent='전송에 실패했습니다. 메일로 직접 연락해주세요.';
      status.classList.add('err');
    }finally{
      btn.disabled=false;label.textContent=orig;
    }
  });
})();

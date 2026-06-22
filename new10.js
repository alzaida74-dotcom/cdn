(function(){
  if (window.__SHAHEQA_PAGE_INIT__) return;
  window.__SHAHEQA_PAGE_INIT__ = true;

  const $  = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const setTxt = (sel, v) => { const el=$(sel); if(el) el.textContent=v; };

  const SHEET_API_URL =
    "https://script.google.com/macros/s/AKfycbx3cZ70QIT0NgizMt-15Q5RRbI6S9VX04XvS7mJqXMR_FnG8tIbpFsGmv2InJ5kYdPu/exec";

  function readCMS(){
    let data = {};
    try {
      const j = document.getElementById('cmsData')?.textContent.trim();
      if (j && !j.includes('{{wf')) data = JSON.parse(j);
    } catch(e){
      console.error('CMS JSON parse error', e);
    }
    return data;
  }
  const cms = readCMS();

  const RAID_VIDEO_URL = "https://res.cloudinary.com/djoewpnpj/video/upload/q_auto/f_auto/v1780252591/%D9%81%D9%8A%D8%AF%D9%8A%D9%88_%D8%A7%D9%84%D8%B1%D8%A7%D8%A6%D8%AF_xu8mnz.mp4";

  function normalizeDigits(str){
    const arabic = '٠١٢٣٤٥٦٧٨٩';
    return String(str || '').replace(/[٠-٩]/g, d => {
      const i = arabic.indexOf(d);
      return i === -1 ? d : String(i);
    });
  }

  // دالة لاستخراج كود المشروع من العنوان / الحقل
  function getProjectCode(cms){
    const allowed = ['04','05','09','11','12','14','15','17','18','20','22','23'];
    let code = null;

    if (cms.title && !String(cms.title).includes('{{wf')) {
      let t = normalizeDigits(cms.title);
      const m = t.match(/\d{1,2}/);
      if (m) code = m[0];
    }

    if (!code && cms.project_code && !String(cms.project_code).includes('{{wf')) {
      let pc = normalizeDigits(cms.project_code).replace(/[^\d]/g,'').trim();
      if (pc) code = pc;
    }

    if (!code) return null;
    if (code.length === 1) code = '0' + code;

    if (!allowed.includes(code)) return null;

    console.log('getProjectCode →', code, 'title =', cms.title);
    return code;
  }

  document.body.classList.toggle('is-project-18', getProjectCode(cms) === '18');
  document.body.classList.toggle('is-project-11', getProjectCode(cms) === '11');

  setTxt('#titleEl', cms.title || '');
  setTxt('#aboutTitle', cms.title || 'عن المشروع');

  const locationText = (cms.city && cms.district)
    ? (cms.city + ' • ' + cms.district)
    : (cms.address || '');

  if (locationText && locationText.trim()) {
    setTxt('#locationEl', locationText);
  } else {
    document.getElementById('locationEl')?.remove();
  }

  const price = cms.display_price ||
    (cms.price_min && cms.price_max
      ? `﷼ ${Number(cms.price_min).toLocaleString()} – ${Number(cms.price_max).toLocaleString()}`
      : '');
  setTxt('#priceEl', price || '');

  const aboutByCode = {
    '15': `
      <p><strong>مشروع شاهقة 15 – شقق واسعة بحي الإزدهار</strong></p>
      <p>
        يقع مشروع شاهقة 15 في حي الإزدهار، ويجمع بين الفخامة والراحة في تصميم عصري يتناسب مع تطلعات سكانه. يقدم المشروع:
      </p>
      <ul>
        <li><strong>الموقع الاستراتيجي:</strong> بحي الإزدهار بشارع نافذ على طريق الإمام سعود بن عبدالعزيز مخرج 9.</li>
        <li><strong>التصميم العصري:</strong> شقق واسعة بمسابح خاصة وواجهات زجاجية واسعة بمساحات خارجية.</li>
        <li><strong>الخدمات المتنوعة:</strong> أرصفة مطوّرة وأنظمة أمان متطورة.</li>
        <li><strong>الاستدامة:</strong> بناء بتقنيات احترافية وترشيد في استهلاك المياه والكهرباء.</li>
      </ul>
    `,
    '17': `
      <p><strong>مشروع شاهقة 17 – شقق وتاون هاوس بحي المحمدية</strong></p>
      <p>
        يعتبر مشروع شاهقة 17 في حي المحمدية واحدًا من أبرز المشاريع السكنية التي تقدم تصميمًا عصريًا يحقق الراحة والفخامة.
      </p>
      <ul>
        <li><strong>الموقع الاستراتيجي:</strong> بحي المحمدية وبشارع نافذ على طريق التخصصي.</li>
        <li><strong>التصميم العصري:</strong> وحدات سكنية فاخرة تشكل مزيجًا من الرحابة والاستدامة.</li>
        <li><strong>الخدمات المتكاملة:</strong> ممرات فاخرة، مسابح ونوادي رياضية، مواقف سيارات، وأنظمة أمان متطورة.</li>
        <li><strong>الاستدامة:</strong> تقنيات حديثة لتحسين كفاءة الطاقة والمياه بعدّادات وخزانات مياه مستقلة.</li>
      </ul>
    `,
    '05': `
      <p><strong>مشروع شاهقة 05 – شقق وتاون هاوس بحي المغرزات</strong></p>
      <p>
        يقع مشروع شاهقة 05 في حي المغرزات، ويجمع بين التصميم العصري والتفاصيل الفاخرة، مما يجعله وجهة مثالية للباحثين عن التكامل والرقي. تشمل مميزات المشروع:
      </p>
      <ul>
        <li><strong>الموقع الاستراتيجي:</strong> موقع متميز في حي المغرزات بشارع نافذ على طريق الملك عبدالله مخرج 10 بالقرب من محطة المترو.</li>
        <li><strong>التصميم العصري:</strong> وحدات سكنية فاخرة تتكون من طابقين أو ثلاثة طوابق.</li>
      </ul>
    `,
    '09': `
      <p><strong>مشروع شاهقة 09 – شقق وتاون هاوس بحي المعذر</strong></p>
      <p>
        يقع مشروع شاهقة 09 في حي المعذر الشمالي، بمجمع سكني متكامل بمرافق متعددة لتحسين جودة الحياة.
      </p>
      <ul>
        <li><strong>الموقع الاستراتيجي:</strong> بحي المعذر الشمالي على طريق الأمير سلطان ويتقاطع مع ثلاثة طرق رئيسية.</li>
        <li><strong>التصميم العصري:</strong> وحدات سكنية متنوعة المساحات والمواصفات، تتميز بتشطيبات فاخرة وإضاءة طبيعية.</li>
        <li><strong>الخدمات المتكاملة:</strong> مساحات خضراء، حضانة للأطفال، مواقف سيارات سفلية، مسبح ونادي رياضي، دار ضيافة، وأنظمة أمن حديثة.</li>
      </ul>
    `,
    '04': `
      <p><strong>مشروع شاهقة 04 – شقق سكنية بحي الريان</strong></p>
      <p>
        يقع مشروع شاهقة 04 في حي الريان، ويتكون من 56 وحدة سكنية مصممة بمعايير عالية، مع مرافق متعددة وتقنيات بناء احترافية توفر جودة حياة متكاملة.
      </p>
      <ul>
        <li><strong>الموقع الاستراتيجي:</strong> على طريق الأمير ماجد بحي الريان، مما يسهّل الوصول للطرق والخدمات الحيوية.</li>
        <li><strong>التصميم المتقن:</strong> وحدات سكنية مدروسة تجمع بين المساحات العملية والتشطيبات العصرية.</li>
        <li><strong>المرافق المتكاملة:</strong> مساحات خضراء، مواقف سيارات، وخدمات مخصصة لراحة السكان.</li>
      </ul>
    `,
    '11': `
      <p><strong>مشروع شاهقة 11 – فلل وتاون هاوس بحي النخيل</strong></p>
      <p>
        يقع مشروع شاهقة 11 في حي النخيل، ويتكون من ستة فلل تاون هاوس وواحد وعشرين فيلا، بتصاميم حديثة وتقنيات بناء احترافية.
      </p>
      <ul>
        <li><strong>الموقع الاستراتيجي:</strong> في حي النخيل بالقرب من الطرق والخدمات الحيوية.</li>
        <li><strong>التصميم الراقي:</strong> فلل بتشطيبات عالية الجودة ومساحات مدروسة.</li>
        <li><strong>المرافق المتكاملة:</strong> مواقف سيارات، مساحات خضراء، وأنظمة بناء وهندسة حديثة.</li>
      </ul>
    `,
    '18': `
      <p><strong>مشروع شاهقة نجد 18 – فلل تاون هاوس بحي الرائد</strong></p>
      <p>
        يتكوّن مشروع شاهقة نجد 18 من فلل تاون هاوس بتصميم يجمع بين الحداثة والأصالة، ليقدّم تجربة سكنية راقية في أحد أكثر أحياء الرياض حيوية.
      </p>
      <ul>
        <li><strong>التكوين السكني:</strong> يتكوّن المشروع من 10 فلل تاون هاوس، تتكوّن كل ڤيلا من 4 طوابق تمتد من القبو بموقف سيارة خاص وحتى السطح.</li>
        <li><strong>التصميم المعماري:</strong> تصميم مستوحى من الطراز السلماني الحديث والعريق، بتصميم م. بندر المنصور، مع واجهات حجرية طبيعية بالكامل.</li>
        <li><strong>المداخل والمساحات:</strong> مدخل رئيسي موحّد تحيط به الأشجار ومصادر التبريد الطبيعية، إضافة إلى مداخل آمنة وذكية.</li>
        <li><strong>الموقع الاستراتيجي:</strong> يقع المشروع في حي الرائد، محاط بطريق الملك عبدالله شمالًا، وطريق العروبة جنوبًا، وطريق الملك خالد غربًا، وطريق الأمير تركي بن عبدالعزيز الأول شرقًا.</li>
        <li><strong>أهم المعالم القريبة:</strong> بالقرب من جامعة الملك سعود، جوهرة الرياض، الكراج، المدينة الرقمية، مستشفى الجامعي، وملعب الأول بارك.</li>
      </ul>
    `,
    '12': `
      <p><strong>مشروع شاهقة 12 – شقق سكنية بحي حطين</strong></p>
      <p>
        يقع مشروع شاهقة 12 في حي حطين، بمجمع سكني متكامل بمرافق متعددة لتحسين جودة الحياة.
      </p>
      <ul>
        <li><strong>التصميم العصري:</strong> وحدات سكنية متنوعة المساحات والمواصفات.</li>
        <li><strong>الاستدامة:</strong> تقنيات حديثة لتحسين كفاءة الطاقة والمياه بعدّادات وخزانات مستقلة.</li>
        <li><strong>المساحات الواسعة:</strong> شقق بمسابح خاصة وواجهات زجاجية ومساحات خارجية.</li>
      </ul>
    `,
    '14': `
      <p><strong>مشروع شاهقة 14 – شقق سكنية بحي الروضة</strong></p>
      <p>
        يقع مشروع شاهقة 14 في حي الروضة، بمجمع سكني متكامل بمرافق متعددة لتحسين جودة الحياة.
      </p>
      <ul>
        <li><strong>التصميم العصري:</strong> وحدات متنوعة المساحات بتشطيبات فاخرة.</li>
        <li><strong>الاستدامة:</strong> تقنيات حديثة لكفاءة الطاقة والمياه.</li>
        <li><strong>المساحات الخارجية:</strong> شقق بواجهات زجاجية ومساحات خارجية مريحة.</li>
      </ul>
    `,
    '20': `
      <p><strong>مشروع شاهقة 20 – شقق سكنية بحي النخيل</strong></p>
      <p>
        يقع مشروع شاهقة 20 في حي النخيل، بمجمع سكني متكامل بمرافق متعددة لتحسين جودة الحياة.
      </p>
      <ul>
        <li><strong>التصميم العصري:</strong> وحدات سكنية متنوعة بمواصفات عالية.</li>
        <li><strong>الاستدامة:</strong> عدّادات وخزانات مياه مستقلة وتقنيات كفاءة الطاقة.</li>
        <li><strong>المسابح والواجهات الزجاجية:</strong> شقق بمسابح خاصة ومساحات خارجية.</li>
      </ul>
    `,
    '22': `
      <p><strong>مشروع شاهقة 22 – شقق سكنية بحي الإزدهار</strong></p>
      <p>
        يقع مشروع شاهقة 22 في حي الإزدهار، بمجمع سكني متكامل بمرافق متعددة لتحسين جودة الحياة.
      </p>
      <ul>
        <li><strong>التصميم العصري:</strong> وحدات متنوعة المساحات بتشطيبات فاخرة.</li>
        <li><strong>الاستدامة:</strong> أنظمة حديثة للطاقة والمياه.</li>
        <li><strong>المساحات الخارجية:</strong> شقق بمسابح خاصة وواجهات زجاجية.</li>
      </ul>
    `,
    '23': `
      <p><strong>مشروع شاهقة 23 – شقق سكنية بحي الملقا</strong></p>
      <p>
        يقع مشروع شاهقة 23 في حي الملقا، بمجمع سكني متكامل بمرافق متعددة لتحسين جودة الحياة.
      </p>
      <ul>
        <li><strong>التصميم العصري:</strong> وحدات سكنية متنوعة بتشطيبات عالية الجودة.</li>
        <li><strong>الاستدامة:</strong> كفاءة في استهلاك الطاقة والمياه بعدّادات وخزانات مستقلة.</li>
        <li><strong>المساحات الواسعة:</strong> شقق بمسابح خاصة وواجهات زجاجية ومساحات خارجية.</li>
      </ul>
    `
  };

  function renderAbout(cms){
    const el = document.getElementById('aboutRTE');
    if (!el) return;

    const code = getProjectCode(cms);
    let html = code && aboutByCode[code] ? aboutByCode[code] : '';

    if (!html) {
      const summaryClean =
        cms.summary &&
        !String(cms.summary).includes('{{wf')
          ? String(cms.summary).trim()
          : '';
      if (summaryClean) {
        html = `<p>${summaryClean}</p>`;
      }
    }

    el.innerHTML = html || '';
  }

  function setupAboutReadMore(){
    const root = document.getElementById('aboutRTE');
    if (!root) return;

    root.querySelectorAll('.about-more-toggle').forEach(b => b.remove());
    root.querySelectorAll('.about-more-wrap').forEach(w => {
      const parent = w.parentNode;
      while (w.firstChild) parent.insertBefore(w.firstChild, w);
      w.remove();
    });

    const firstP = root.querySelector('p');
    if (!firstP) return;

    const toWrap = [];
    let node = firstP.nextSibling;
    while (node){
      const next = node.nextSibling;
      if (!(node.nodeType === 3 && !node.textContent.trim())) {
        toWrap.push(node);
      }
      node = next;
    }

    if (toWrap.length === 0) return;

    const wrap = document.createElement('div');
    wrap.className = 'about-more-wrap';
    wrap.hidden = true;
    toWrap.forEach(n => wrap.appendChild(n));
    root.appendChild(wrap);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'about-more-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = 'انظر للمزيد <span aria-hidden="true">↙</span>';

    btn.addEventListener('click', () => {
      const opened = !wrap.hidden;
      wrap.hidden = opened;
      btn.setAttribute('aria-expanded', String(!opened));
      btn.innerHTML = opened
        ? 'انظر للمزيد <span aria-hidden="true">↙</span>'
        : 'إخفاء <span aria-hidden="true">↗</span>';
    });

    firstP.insertAdjacentElement('afterend', btn);
  }

  renderAbout(cms);
  setupAboutReadMore();

  (function(){
    try{
      if (typeof getProjectCode !== 'function') return;
      const code = getProjectCode(cms);
      if (code !== '18') return;

      document.body.classList.add('is-project-18');

      const grid = document.getElementById('guaranteesGrid');
      if (!grid) return;

      const guarantees = [
        { years: '15 سنوات', title: 'على المصاعد', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/696646acd015da80c44b4281_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%D8%A7%D8%AA-02.png' },
        { years: '4 سنوات', title: 'على الأبواب الخشبية', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/696646ac4ee30e0ed95cbc2b_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%D8%A7%D8%AA-04.png' },
        { years: '25 سنوات', title: 'على الكيابل والقواطع', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/696646ac7b21a1c89ba1e8e1_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%D8%A7%D8%AA-05.png' },
        { years: '10 سنوات', title: 'على السباكة والكهرباء', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/696646acc3ca94b116df5313_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%D8%A7%D8%AA-01.png' },
        { years: '10 سنوات', title: 'على هيكل المباني الخرساني', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/696646aca1ab9aba2d31ec2d_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%D8%A7%D8%AA-03.png' },
        { years: '10 سنوات', title: 'على العزل المائي', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6968a9a6904b7884558fcad9_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86%D8%A7%D8%AA-06.png' }
      ];

      grid.innerHTML = '';
      guarantees.forEach(g => {
        const item = document.createElement('div');
        item.className = 'guarantee-item';
        item.innerHTML = `
          <div class="guarantee-icon">
            <img src="${g.icon}" alt="${g.title}">
          </div>
          <div class="guarantee-text">
            <div class="guarantee-years">${g.years}</div>
            <div class="guarantee-title">${g.title}</div>
          </div>
        `;
        grid.appendChild(item);
      });
    } catch(e){
      console.warn('guarantees 18 error', e);
    }
  })();

  const unitsCode = getProjectCode(cms);
  if (unitsCode === '18') {
    document.body.classList.add('is-project-18');
    setTxt('#typeTxt', 'فلل تاون هاوس');
  }
  if (unitsCode === '11') {
    document.body.classList.add('is-project-11');
    setTxt('#typeTxt', 'فلل وتاون هاوس');
  }

  let total = parseInt(cms.units_total || '0', 10);
  let sold  = parseInt(cms.units_sold  || '0', 10);

  if (unitsCode === '17') { total = 21; sold = 14; }
  else if (unitsCode === '09') { total = 34; sold = 33; }
  else if (unitsCode === '05') { total = 10; sold = 9; }
  else if (unitsCode === '15') { total = 12; sold = 11; }
  else if (unitsCode === '18') { total = 10; sold = 0; }
  else if (unitsCode === '11') { total = 27; sold = 23; }

  const left = (Number.isFinite(total) && Number.isFinite(sold)) ? (total - sold) : null;

  setTxt('#unitsTotal', Number.isFinite(total) && total > 0 ? total : '');
  setTxt('#unitsSold',  Number.isFinite(sold) ? sold : '');
  setTxt('#unitsLeft',  (left !== null && Number.isFinite(left)) ? left : '');

  const pct = (Number.isFinite(total) && total > 0 && Number.isFinite(sold))
    ? Math.max(0, Math.min(100, Math.round((sold / total) * 100)))
    : 0;

  const soldProgressEl = document.getElementById('soldProgress');
  if (soldProgressEl) soldProgressEl.style.setProperty('--p', pct);
  setTxt('#soldPct', pct + '%');

  (function renderLocation(){
    const frame = document.getElementById('mapFrame');
    const desc  = document.getElementById('locDesc');
    const pane  = document.getElementById('pane-location');
    if (!frame || !desc) return;

    const code = getProjectCode(cms);

    const CID_BY_CODE = {
      '18': '6241089610324046634',
      '17': '7196544270481866936',
      '15': '8525767876646518836',
      '09': '17949961849567976513',
      '11': '13320248746493783802',
      '23': '13123803529855442518',
      '22': '7150388745105491727',
      '14': '2822120895075140644',
      '20': '14195304373913869194',
      '12': '17734501840928893005',
      '05': '17074239158611492660',
      '04': '3419791781832299822'
    };

    const DESC_BY_CODE = {
      '18': 'شاهقة نجد 18 — حي الرائد، الرياض',
      '17': 'شاهقة 17 — الموقع على الخريطة',
      '15': 'شاهقة 15 — الموقع على الخريطة',
      '09': 'شاهقة 09 — الموقع على الخريطة',
      '11': 'شاهقة 11 — الموقع على الخريطة',
      '23': 'شاهقة 23 — الموقع على الخريطة',
      '22': 'شاهقة 22 — الموقع على الخريطة',
      '14': 'شاهقة 14 — الموقع على الخريطة',
      '20': 'شاهقة 20 — الموقع على الخريطة',
      '12': 'شاهقة 12 — الموقع على الخريطة',
      '05': 'شاهقة 05 — الموقع على الخريطة',
      '04': 'شاهقة 04 — الموقع على الخريطة'
    };

    const cid = CID_BY_CODE[code];
    if (cid){
      desc.textContent = DESC_BY_CODE[code] || 'موقع المشروع على الخريطة';
      frame.src = `https://www.google.com/maps?cid=${cid}&output=embed`;
      return;
    }

    const latOk = cms.lat && !String(cms.lat).includes('{{wf');
    const lngOk = cms.lng && !String(cms.lng).includes('{{wf');
    if (latOk && lngOk){
      frame.src = `https://maps.google.com/maps?q=${cms.lat},${cms.lng}&z=14&output=embed`;
      desc.textContent =
        (cms.city && cms.district)
          ? `يقع المشروع في ${cms.city} — ${cms.district}.`
          : 'يقع المشروع في موقع مميز قريب من الخدمات.';
      return;
    }

    if (pane) pane.remove();
  })();

  const statusVal = (cms.status && !String(cms.status).includes('{{wf'))
    ? String(cms.status).trim()
    : '';

  function colorStatus(dot, val){
    if (!dot) return;
    const s = (val || '').toLowerCase()
      .replace(/[ٱإأآا]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/[ًٌٍَُِّْ]/g,'')
      .replace(/قريبًا|قريبا/g,'قريبا')
      .trim();

    let color = null, glow = null;
    if (s.includes('متاح') || s.includes('للبيع')) {
      color = getComputedStyle(document.documentElement).getPropertyValue('--success') || '#22c55e';
      glow  = 'rgba(34,197,94,.18)';
    } else if (s.includes('تحت الانشاء') || s.includes('تحت الإنشاء') || s.includes('قريبا')) {
      color = getComputedStyle(document.documentElement).getPropertyValue('--warn') || '#f59e0b';
      glow  = 'rgba(245,158,11,.18)';
    } else if (s.includes('تم البيع') || s.includes('مباع') || s.includes('غير متاح')) {
      color = getComputedStyle(document.documentElement).getPropertyValue('--danger') || '#ef4444';
      glow  = 'rgba(239,68,68,.18)';
    } else {
      color = '#9ca3af';
      glow  = 'rgba(156,163,175,.18)';
    }
    dot.style.background = color.trim();
    dot.style.boxShadow  = `0 0 0 6px ${glow}`;
  }

  if (statusVal) {
    let cleanStatus = statusVal.replace(/[□☐■▢]/g,'').trim();

    if (document.body.classList.contains('is-project-18')
        && /قريبًا|قريبا/i.test(cleanStatus)) {
      cleanStatus = 'متاح للبيع';
    }

    if (document.body.classList.contains('is-project-11')) {
      cleanStatus = 'متاح للبيع';
    }

    setTxt('#statusTxt', cleanStatus);
    setTxt('#statusTxt2', cleanStatus);
    colorStatus(document.getElementById('statusDot'), cleanStatus);
  } else {
    document.getElementById('statusWrap')?.remove();
    document.getElementById('statusWrap2')?.remove();
  }

  const setSrc = (sel, v) => { const el=$(sel); if (el && v) el.src = v; };

  const PROJECT18_GALLERY_IMAGES = [
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4309f65b443e98c2880e_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114357.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4308ae5200db33779637_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114253.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c43088af46ae5fe15c50f_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114139.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4306de982ae760962f04_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114507.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c430679bdbb7bcadf8703_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114607.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4306c2e2c2c296a18367_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114710.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c43068ee7dd8dec124679_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114621.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4304e205ee1445b3271c_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114730.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c43046624ba5e79689dc2_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114743.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c43041ef88b639fe6701b_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114645.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c43027b29c00343ae9ec1_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114637.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4301857c4af2513ad468_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114943.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4301e205ee1445b32663_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114836.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4301123bb587e215909d_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114849.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4301cafdb57d98d8d43f_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20115035.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c430064f4d65f398fa25c_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114932.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c430031389e263ff6fcf9_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114900.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c4300d34c028d89a6a923_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114953.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c430088ea9afe823cc2a2_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114827.png",
    "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c42ff513cb27899ae0280_%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202026-02-11%20114807.png"
  ];

  function renderProject18Gallery(){
    const pane = document.getElementById('pane-gallery');
    if (!pane) return;

    const container =
      pane.querySelector('[data-gallery]') ||
      pane.querySelector('.gallery-grid') ||
      pane.querySelector('.gallery') ||
      pane.querySelector('.grid') ||
      pane;

    container.innerHTML = `
      <div class="zoomable project18-gallery-grid" style="
        display:grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap:14px;
        align-items:stretch;
      "></div>
    `;

    const grid = container.querySelector('.project18-gallery-grid');
    if (!grid) return;

    const imgs = PROJECT18_GALLERY_IMAGES
      .filter(u => typeof u === 'string' && u.trim())
      .filter((u,i,arr)=>arr.indexOf(u)===i);

    imgs.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.style.cssText = `
        border-radius:16px;
        overflow:hidden;
        background: rgba(255,255,255,0.02);
      `;
      card.innerHTML = `
        <img
          src="${src}"
          alt="صورة ${i+1}"
          loading="lazy"
          style="width:100%; height:220px; object-fit:cover; display:block; cursor:zoom-in;"
        />
      `;
      grid.appendChild(card);
    });
  }

  const codeForHero = getProjectCode(cms);

  let imgsAll = [cms.image1, cms.image2, cms.image3, cms.image4, cms.image5]
    .filter(u => typeof u === 'string' && u.trim() && !u.includes('{{wf'));
  imgsAll = imgsAll.filter((u,i)=>imgsAll.indexOf(u)===i);

  if (codeForHero === '18') {
    const heroLeft = document.querySelector('.hero-left');
    const heroImg  = document.getElementById('heroMain');

    if (heroImg) heroImg.style.display = 'none';

    if (heroLeft && !document.getElementById('heroVideo')) {
      heroLeft.insertAdjacentHTML('afterbegin', `
        <video id="heroVideo" autoplay muted loop playsinline controls>
          <source src="${RAID_VIDEO_URL}" type="video/mp4">
        </video>
      `);
    }

    const imgs = [cms.image2, cms.image3, cms.image4, cms.image5]
      .filter(u => typeof u === 'string' && u.trim() && !u.includes('{{wf'));
    const thumbs = imgs.slice(0,4);
    ['#h1','#h2','#h3','#h4'].forEach((sel, i) => setSrc(sel, thumbs[i]));

    renderProject18Gallery();

    ['#h1','#h2','#h3','#h4'].forEach(sel=>{
      const el=$(sel);
      if (el && !el.getAttribute('src')) el.closest('.thumb')?.remove();
    });

  } else {
    if (imgsAll[0]) setSrc('#heroMain', imgsAll[0]);
    const thumbs = imgsAll.slice(1,5);
    ['#h1','#h2','#h3','#h4'].forEach((sel, i) => setSrc(sel, thumbs[i]));

    setSrc('#g1', imgsAll[0]);
    setSrc('#g2', imgsAll[1]);
    setSrc('#g3', imgsAll[2]);

    ['#h1','#h2','#h3','#h4','#g1','#g2','#g3','#heroMain'].forEach(sel=>{
      const el=$(sel);
      if (el && !el.getAttribute('src')) {
        if (['#h1','#h2','#h3','#h4'].includes(sel)) el.closest('.thumb')?.remove();
        else el.remove();
      }
    });
  }

  function openLightbox(src){
    const lb=document.getElementById('lightbox');
    const im=document.getElementById('lightboxImg');
    if(!src||!lb||!im) return;
    im.src=src;
    lb.classList.add('open');
  }

  document.addEventListener('click', (e)=>{
    const img = e.target.closest('.zoomable img');
    if (!img) return;
    openLightbox(img.src);
  }, true);

  ['#g1','#g2','#g3'].forEach(id=>{
    const el=$(id);
    if (el) el.addEventListener('click',()=>openLightbox(el.src));
  });

  document.getElementById('lightboxClose')?.addEventListener('click',()=>{
    document.getElementById('lightbox')?.classList.remove('open');
  });
  document.getElementById('lightbox')?.addEventListener('click',e=>{
    if(e.target===e.currentTarget) e.currentTarget.classList.remove('open');
  });

  const panes = {
    about:    document.getElementById('pane-about'),
    features: document.getElementById('pane-features'),
    location: document.getElementById('pane-location'),
    gallery:  document.getElementById('pane-gallery')
  };
  $$('.tab').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.tab').forEach(b=>b.setAttribute('aria-selected','false'));
    btn.setAttribute('aria-selected','true');
    Object.values(panes).forEach(p=>p.hidden=true);
    const pane = panes[btn.dataset.tab]; if (pane) pane.hidden=false;
    const tabsEl=document.querySelector('.tabs');
    if (tabsEl) window.scrollTo({
      top:tabsEl.getBoundingClientRect().top+window.scrollY-80,
      behavior:'smooth'
    });
  }));

  const AMENITY_ICON = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M9 12.5l2 2 4-4"></path>
    </svg>
  `;

  const amenitiesBase = [
    'تكييف مخفي',
    'مصاعد خاصة',
    'ممرات فاخرة',
    'مساحات خارجية',
    'واحة داخلية'
  ];

  const amenities18 = [
    'مصعد داخلي لكل وحدة',
    'مواقف سيارات مغلقه خاصة',
    'واجهات حجرية',
    'ممرات مشجرة ومزودة بالرذاذ',
    'أرضيات بورسلان فاخر',
    'غرف خدمات خاصة',
    'أنظمة الأمن والسلامة',
    'حي راقي ومكتمل الخدمات',
    'جناح خاص ومتكامل'
  ];

  const extras15 = [
    'مواقف سفلية',
    'واجهات زجاجية واسعة',
    'منطقة سباحة',
    'كاميرات مراقبة',
    'غرفة خادمة',
    'مداخل فاخرة'
  ];

  const extras17 = [
    'مواقف سفلية',
    'واجهات زجاجية واسعة',
    'منطقة سباحة',
    'نادي رياضي',
    'مواقف قبو'
  ];

  const extras05 = [
    'مواقف سفلية',
    'واجهات زجاجية واسعة'
  ];

  const extras09 = [
    'مواقف سفلية',
    'واجهات زجاجية واسعة',
    'منطقة سباحة',
    'نادي رياضي',
    'مواقف قبو',
    'دار ضيافة',
    'مساحات داخلية'
  ];

  function buildAmenitiesList(cms){
    const code = getProjectCode(cms);
    if (code === '18') return amenities18;

    let list = [...amenitiesBase];
    let extras = [];

    if (code === '15') extras = extras15;
    else if (code === '17') extras = extras17;
    else if (code === '05') extras = extras05;
    else if (code === '09') extras = extras09;

    const seen = new Set(list);
    extras.forEach(item => {
      if (!seen.has(item)) {
        seen.add(item);
        list.push(item);
      }
    });

    return list;
  }

  (function renderAmenities(){
    const code = getProjectCode(cms);

    const wrap = document.getElementById('amenitiesList');
    if (wrap) wrap.innerHTML = '';

    if (code === '18') {
      const grid = document.getElementById('features18Grid');
      if (!grid) return;

      const features18 = [
        { title: 'نظام سمارت هوم لكامل الوحدة', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40b5317c38d03bedd80_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-07.png' },
        { title: 'أنظمة استشعار للإنارة', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40c813bd6e617d26903_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-04.png' },
        { title: 'أنظمة مداخل آمنة وذكية', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40cf8d197178034f803_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-01.png' },
        { title: 'مواقف سفلية مستقلة وآمنة لكل وحدة', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40c8c18c5a3b535e18b_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-08.png' },
        { title: 'تشجير طبيعي داخل وخارج الوحدة', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40cfdbb7b5cd3162dff_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-05.png' },
        { title: 'تصميم حديث وعصري بواجهات حجرية', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40be9de68f153256783_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-02.png' },
        { title: 'مصاعد مستقلة لكل وحدة أربع طوابق', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40c5b9045bf578fe539_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-09.png' },
        { title: 'أنظمة دفاع مدني', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40ce424cdae69c0c481_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-06.png' },
        { title: 'عداد مياه وكهرباء وخزان مستقل لكل وحدة', icon: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6979f40c47befaafd39c6654_%D8%A7%D9%8A%D9%82%D9%88%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA-03.png' }
      ];

      grid.innerHTML = '';
      features18.forEach(f => {
        const item = document.createElement('div');
        item.className = 'feature18-item';
        item.innerHTML = `
          <div class="feature18-icon">
            <img src="${f.icon}" alt="${f.title}">
          </div>
          <div class="feature18-text">
            <div class="feature18-title">${f.title}</div>
          </div>
        `;
        grid.appendChild(item);
      });

      return;
    }

    if (!wrap) return;

    const list = buildAmenitiesList(cms);
    wrap.innerHTML = '';

    list.forEach(txt => {
      const div = document.createElement('div');
      div.className = 'amenity';
      div.innerHTML = AMENITY_ICON + txt;
      wrap.appendChild(div);
    });
  })();

  /* ===== قسم المخططات والأسعار ===== */
  function renderPlansSection(cms){
    const wrap = document.getElementById('plansPricingContent');
    if (!wrap) return;

    wrap.innerHTML = '';

    wrap.classList.add('plans-grid');
    wrap.classList.remove('plans-grid-4');

    const code = getProjectCode(cms);
    console.log('renderPlansSection → code =', code);

    const singlePlanMap = {
      '15': { img: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6978a7463d24b9fcda87b90e_page1.png', label: 'رقم الوحدة 1', hint: 'المساحة: 219.32 م² | السعر: 1,847,000' },
      '05': { img: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/692d56ecb17da7e7bb88cf70_05-1%2B.png', label: 'رقم الوحدة 6', hint: 'المساحة: 240 م² | السعر: 2,050,347' },
      '09': { img: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/692d56f23d6cc69fd6de1f18_09-1%2B.png', label: 'رقم الوحدة A02', hint: 'المساحة: 227 م² | السعر: 2,090,000' }
    };

    if (singlePlanMap[code]) {
      const p = singlePlanMap[code];
      const card = document.createElement('article');
      card.className = 'plan-card';
      card.innerHTML = `
        <div class="plan-card__img">
          <img src="${p.img}" alt="${p.label}" loading="lazy">
        </div>
        <div class="plan-card__body">
          <div>
            <div class="plan-card__label">${p.label}</div>
            <div class="plan-card__hint">${p.hint}</div>
          </div>
          <button type="button" class="plan-card__zoom">تكبير</button>
        </div>
      `;

      const open = ()=>openLightbox(p.img);
      card.querySelector('img')?.addEventListener('click', open);
      card.querySelector('.plan-card__zoom')?.addEventListener('click', open);
      card.addEventListener('click', e=>{
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') return;
        open();
      });

      wrap.appendChild(card);
      return;
    }

    // ========== تعديل قسم شاهقة 17: إضافة المخططات الأربعة المطلوبة مع الأسعار والوحدات الجديدة ==========
    if (code === '17') {
      // الوحدات المطلوبة مع الأسعار والمساحات
      const units = [
        {
          img: "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6a11d133772c7e9a2a09b958_T3.png",
          label: "رقم الوحدة: T3",
          hint: "المساحة: 196.8 م² | السعر: 2,150,000 ريال"
        },
        {
          img: "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6a11d1325738e8a9c5a1edd6_M1.jpg",
          label: "رقم الوحدة: 18",
          hint: "المساحة: 195.27 م² | السعر: 1,890,000 ريال"
        },
        {
          img: "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69d69518b663edbd43879d11_0__%D9%85%D8%AE%D8%B7%D8%B7%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D8%AD%D9%85%D8%AF%D9%8A%D8%A9-04.jpg.jpeg",
          label: "رقم الوحدة: T10",
          hint: "المساحة: 204.75 م² | السعر: 2,459,000 ريال"
        },
        {
          img: "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6a11d134cc5714116b9f8930_T4.png",
          label: "رقم الوحدة: T4",
          hint: "المساحة: 220.97 م² | السعر: 2,950,000 ريال"
        },
        // الوحدة الجديدة الأولى
        {
          img: "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/691eefd8fb5f1e6cbbc81c82_%D8%A7%D9%84%D9%85%D8%AD%D9%85%D8%AF%D9%8A%D8%A9%D8%8C%202.png",
          label: "رقم الوحدة: T8",
          hint: "المساحة: 231.92 م² | السعر: 2,749,000 ريال"
        },
        // الوحدة الجديدة الثانية
        {
          img: "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/691eefd807394bd8d10734be_%D8%A7%D9%84%D9%85%D8%AD%D9%85%D8%AF%D9%8A%D8%A9%D8%8C%203.png",
          label: "رقم الوحدة: 19",
          hint: "المساحة: 298.4 م² | السعر: 2,450,000 ريال"
        },
	 {
          img: "https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/6a11d133cc5714116b9f8918_T5.png",
          label: "رقم الوحدة: T5",
          hint: "المساحة: 196.79 م² | السعر: 2,399,000 ريال"
        }
      ];

      units.forEach(unit => {
        const card = document.createElement('article');
        card.className = 'plan-card';
        card.innerHTML = `
          <div class="plan-card__img">
            <img src="${unit.img}" alt="${unit.label}" loading="lazy">
          </div>
          <div class="plan-card__body">
            <div>
              <div class="plan-card__label">${unit.label}</div>
              <div class="plan-card__hint">${unit.hint}</div>
            </div>
            <button type="button" class="plan-card__zoom">تكبير</button>
          </div>
        `;
        const open = () => openLightbox(unit.img);
        card.querySelector('img')?.addEventListener('click', open);
        card.querySelector('.plan-card__zoom')?.addEventListener('click', open);
        card.addEventListener('click', e => {
          if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') return;
          open();
        });
        wrap.appendChild(card);
      });
      return;
    }

    if (code === '11') {
      const units11 = [
        {
          img: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c5c7197afd6b738f442ff_%D9%88%D8%AD%D8%AF%D8%A7%D8%AA%20%D8%A7%D9%84%D9%86%D8%AE%D9%8A%D9%84-01.jpg.jpeg',
          label: 'رقم الوحدة: 21',
          hint: 'عدد الغرف: 3 | دورات المياه: 4 | المساحة الإجمالية: 278.71 م² | السعر: 1,950,000'
        },
        {
          img: 'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/698c5c7137c2b3ba18a554fb_%D9%88%D8%AD%D8%AF%D8%A7%D8%AA%20%D8%A7%D9%84%D9%86%D8%AE%D9%8A%D9%84-04.jpg.jpeg',
          label: 'رقم الوحدة: V6',
          hint: 'عدد الغرف: 4 | دورات المياه: 5 | المساحة الإجمالية: 501.08 م² | السعر: 3,900,000'
        }
      ];

      units11.forEach(plan => {
        const card = document.createElement('article');
        card.className = 'plan-card';
        card.innerHTML = `
          <div class="plan-card__img">
            <img src="${plan.img}" alt="${plan.label}" loading="lazy">
          </div>
          <div class="plan-card__body">
            <div>
              <div class="plan-card__label">${plan.label}</div>
              <div class="plan-card__hint">${plan.hint}</div>
            </div>
            <button type="button" class="plan-card__zoom">تكبير</button>
          </div>
        `;
        const open = () => openLightbox(plan.img);
        card.querySelector('img')?.addEventListener('click', open);
        card.querySelector('.plan-card__zoom')?.addEventListener('click', open);
        card.addEventListener('click', e => {
          if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') return;
          open();
        });
        wrap.appendChild(card);
      });
      return;
    }

    // ========== تعديل قسم شاهقة 18: ترتيب الفلل من الأقل سعراً إلى الأكثر ==========
    if (code === '18') {
      wrap.classList.add('plans-grid-4');
      wrap.classList.remove('plans-grid');

      let villas18 = [
        { unit: 1,  area: 352, price: 4050000 },
        { unit: 2,  area: 360, price: 4900000 },
        { unit: 3,  area: 349, price: 3950000 },
        { unit: 4,  area: 351, price: 3990000 },
        { unit: 5,  area: 382, price: 4180000 },
        { unit: 6,  area: 367, price: 3990000 },
        { unit: 7,  area: 328, price: 3780000 },
        { unit: 8,  area: 316, price: 3730000 },
        { unit: 9,  area: 328, price: 3850000 },
        { unit: 10, area: 320, price: 3950000 }
      ];

      // ترتيب تصاعدي حسب السعر
      villas18.sort((a, b) => a.price - b.price);

      function formatVillaPrice(raw){
        const n = Number(raw);
        if (Number.isFinite(n) && n > 0) return n.toLocaleString('en-US');
        return String(raw);
      }

      function addModelSection(modelName, imgs, addDivider = true){
        const idx = villas18.findIndex(v => v.unit === parseInt(String(modelName).replace(/[^\d]/g,''), 10));
        const v = idx !== -1 ? villas18[idx] : { unit: modelName, area: '', price: 0 };

        const title = document.createElement('div');
        title.className = 'prose villa-heading';
        title.innerHTML = `<strong>فيلا رقم ${v.unit}</strong>`;
        wrap.appendChild(title);

        const info = document.createElement('div');
        info.className = 'prose villa-info';
        info.style.opacity = '.85';
        info.style.margin = '6px 0 10px';
        info.style.lineHeight = '1.9';

        const priceTxt = formatVillaPrice(v.price);
        info.innerHTML = `
          <span><strong>نوع الوحدة:</strong> فيلا</span>
          <span>•</span>
          <span><strong>المساحة:</strong> ${v.area} م²</span>
          <span>•</span>
          <span><strong>عدد الطوابق:</strong> 4</span>
          <span>•</span>
          <span>
            <strong>السعر:</strong>
            <span dir="ltr">${priceTxt}</span>
            ريال
          </span>
        `;
        wrap.appendChild(info);

        const group = document.createElement('div');
        group.className = 'plan-group';

        const items = [
          { img: imgs[0], label: 'مخطط القبو' },
          { img: imgs[1], label: 'مخطط الطابق الأرضي' },
          { img: imgs[2], label: 'مخطط الطابق الأول' },
          { img: imgs[3], label: 'مخطط الملحق' }
        ];

        items.forEach(p => {
          const card = document.createElement('article');
          card.className = 'plan-card';
          card.innerHTML = `
            <div class="plan-card__img">
              <img src="${p.img}" alt="فيلا ${v.unit} - ${p.label}" loading="lazy">
            </div>
            <div class="plan-card__body">
              <div class="plan-card__label">${p.label}</div>
              <button type="button" class="plan-card__zoom">تكبير</button>
            </div>
          `;
          const open = () => openLightbox(p.img);
          card.querySelector('img')?.addEventListener('click', open);
          card.querySelector('.plan-card__zoom')?.addEventListener('click', open);
          group.appendChild(card);
        });

        wrap.appendChild(group);

        if (addDivider) {
          const divider = document.createElement('div');
          divider.style.gridColumn = '1 / -1';
          divider.style.height = '20px';
          wrap.appendChild(divider);
        }
      }

      // إضافة الفلل حسب الترتيب الجديد (من الأقل سعراً للأعلى)
      addModelSection('V08', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e809789c83632118fed_01%20BasementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e819cba18c02130e685_02%20groundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e817f339931f605b7a9_03%20first%20DIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e81254f645ec7b25594_04%20secondDIM.jpg'
      ], true);

      addModelSection('V07', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e1849911f1e7704d16d_01%20basementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e18254f645ec7b24904_02%20groundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e17cc1fa3b0d6b0a2bb_03%20firstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2e189ae00ddce3a2ce52_04%20secondDIM.jpg'
      ], true);

      addModelSection('V09', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ec1f0b12d963f5d96ba_01%20basementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ec240f5b2d676b0ed02_02%20groundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ec14da8465a80c91ef8_03%20FirstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ec18d3221e0543a6575_03%20SecondDIM.jpg'
      ], true);

      addModelSection('V03', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ca2b833eeb64ea0a3db_01%20basementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ca363739bb461f2344a_02%20groundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ca3052db34cbe0e4259_03%20firstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2ca3254f645ec7b20eac_04%20SecondDIM.jpg'
      ], true);

      addModelSection('V10', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2fb94b788d84c818cd2d_01%20Basement%20DIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2fbb21dc1f89945724d2_02%20Ground%20Floor%20DIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2fba5f58a0788e4f48ed_03%20First%20Floor%20DIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2fbb7d55a1a83f654496_04%20second%20Floor%20DIM.jpg'
      ], true);

      addModelSection('V06', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2dc5929a95040bcc5a2b_01basementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2dc67cac60ab9c9ec74b_02%20groundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2dc5a011f4e90346363b_03%20firstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2dc7ef018b6ed3bbee2a_04secondDIM.jpg'
      ], true);

      addModelSection('V04', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d04dcc66055011a174b_01%20basementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d04dc8a8bdb387b867c_02%20groundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d04a84e4f90933fce45_03%20firstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d04b22456b5aae2b6e0_04%20secondDIM.jpg'
      ], true);

      addModelSection('V01', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd29e00df6081acacac21b_01BasementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd29fa0d4e35e1f3d314fa_02%20GroundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2a08a3ec87be56fff09f_03%20firstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2a1a24ec151ac337c1df_04%20SecondDIM.jpg'
      ], true);

      addModelSection('V05', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d6ea6f97933a28ce50e_01basementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d6ffeb517a0cb32589f_02%20groundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d6ec196845fbf85afa5_03%20firstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2d6ed0ac79de16b76983_04%20SecondDIM.jpg'
      ], true);

      addModelSection('V02', [
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2c3358365e1a77465b92_01%20BasementDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2c3440f5b2d676b05dbb_02%20GroundDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2c339789c836321132a0_03%20FirstDIM.jpg',
        'https://cdn.prod.website-files.com/67975abfab0dbc5fe726e03d/69dd2c34f253b78e98d087de_04%20SecondDIM.jpg'
      ], false);

      return;
    }

    const p = document.createElement('p');
    p.className = 'prose';
    p.textContent = 'سيتم توفير المخططات التفصيلية لهذا المشروع قريبًا.';
    wrap.appendChild(p);
  }

  renderPlansSection(cms);

  document.addEventListener('click', (e)=>{
    if (!document.body.classList.contains('is-project-18')) return;
    const group = e.target.closest('.plan-group');
    if (!group) return;
  }, true);

  function getVideoUrl(obj){
    const candidates = [obj.video, obj.link1, obj.video_url, obj.youtube, obj.VIDEO].filter(Boolean);
    if (!candidates.length && obj.description_html && typeof obj.description_html === 'string') {
      const m = obj.description_html.match(/https?:\/\/[^\s"'<>]+/i);
      if (m) candidates.push(m[0]);
    }
    return candidates.find(u => typeof u === 'string' && u.trim() && !u.includes('{{wf'));
  }

  function toYouTubeEmbed(url){
    try{
      const u = new URL(url);
      if (/^(www\.)?youtube\.com$/i.test(u.hostname)) {
        const id = u.searchParams.get('v') || (u.pathname.startsWith('/shorts/') ? u.pathname.split('/')[2] : null);
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (/^youtu\.be$/i.test(u.hostname)) {
        const id = u.pathname.slice(1);
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    }catch(e){}
    return null;
  }

  (function setupVideo(){
    const videoSection   = document.getElementById('videoSection');
    const videoContainer = document.getElementById('videoContainer');
    const watchBtn       = document.getElementById('watchVideoBtn');
    if (!videoSection || !videoContainer) return;

    const url = getVideoUrl(cms);

    if (!url) {
      videoSection.remove();
      watchBtn?.remove();
      return;
    }

    const ytembed = toYouTubeEmbed(url);
    if (ytembed){
      const iframe = document.createElement('iframe');
      iframe.src = ytembed + '?rel=0&modestbranding=1';
      iframe.title = 'مشغل فيديو YouTube';
      iframe.width = '100%';
      iframe.height = '420';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
	
	iframe.style.border = '0';
iframe.style.borderRadius = '18px';
iframe.style.display = 'block';
videoContainer.style.borderRadius = '18px';
videoContainer.style.overflow = 'hidden';
videoContainer.appendChild(iframe);
      

    } else {
      const vid = document.createElement('video');
      vid.className = 'video';
      vid.controls = true;
      vid.preload  = 'metadata';
      vid.style.width = '100%';
      vid.style.height = 'auto';
      const src = document.createElement('source');
      src.src = url;
      if (/\.mp4(\?|#|$)/i.test(url))  src.type = 'video/mp4';
      if (/\.webm(\?|#|$)/i.test(url)) src.type = 'video/webm';
      vid.appendChild(src);
      videoContainer.appendChild(vid);
    }
    videoSection.hidden = false;
  })();

  document.getElementById('copyLink')?.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(location.href);
      toast('تم نسخ رابط المشروع');
    }
    catch{
      toast('تعذر النسخ');
    }
  });

  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn){
    const WA_PHONE = '966920013528';
    const code = getProjectCode(cms);

    const rawTitle = (cms.title && !String(cms.title).includes('{{wf'))
      ? String(cms.title).trim()
      : '';

    let projectName = rawTitle || (code ? `شاهقة ${code}` : '');

    const whatsappMsg = projectName
      ? `مرحبًا، أود الاستفسار عن ${projectName}.`
      : 'مرحبًا، أودّ الاستفسار عن أحد مشاريع شاهقة.';

    const whatsappUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(whatsappMsg)}`;

    whatsappBtn.addEventListener('click', ()=>{
      window.open(whatsappUrl, '_blank');
    });
  }

  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn){
    shareBtn.addEventListener('click', async ()=>{
      const shareTitle = cms.title || 'أحد مشاريع شاهقة العقارية';
      const shareText  = 'اطلع على هذا المشروع من شاهقة العقارية:';

      if (navigator.share){
        try{
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: location.href
          });
        } catch(e){}
      } else {
        try{
          await navigator.clipboard.writeText(location.href);
          toast('تم نسخ الرابط، يمكنك لصقه ومشاركته مع الآخرين');
        } catch{
          alert('انسخ رابط الصفحة من شريط العنوان لمشاركته.');
        }
      }
    });
  }

  document.getElementById('leadForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const fd   = new FormData(form);

    const name     = (fd.get('name')||'').toString().trim();
    const phone    = (fd.get('phone')||'').toString().trim();
    const purchase = (fd.get('purchase')||'').toString().trim();

    if (!name || !phone || !purchase){
      toast('رجاءً أدخل الاسم ورقم الجوال واختر طريقة الشراء.');
      return;
    }

    const projectCode   = getProjectCode(cms);
    const projectTitle  = cms.title && !String(cms.title).includes('{{wf')
      ? cms.title
      : 'مشروع شاهقة';

    const projectLabel =
      projectTitle + (projectCode ? ` (كود ${projectCode})` : '');

    const payload = {
      name,
      phone,
      purchase,
      project: projectLabel,
      message: `سجل اهتمام - ${projectLabel} | طريقة الشراء: ${purchase}`
    };

    try{
      await fetch(SHEET_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      toast('شكرًا، تم استلام طلبك وسيتواصل فريق المبيعات معك');
      form.reset();
    }catch(err){
      console.error(err);
      toast('حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
    }
  });

  function toast(msg){
    const t=document.createElement('div');
    t.textContent=msg;
    t.style.cssText=
      'position:fixed;bottom:18px;left:18px;background:#111;color:#fff;' +
      'padding:10px 14px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.18);' +
      'z-index:70;opacity:0;transform:translateY(8px)';
    document.body.appendChild(t);
    requestAnimationFrame(()=>{
      t.style.transition='all .25s ease';
      t.style.opacity='1';
      t.style.transform='translateY(0)';
    });
    setTimeout(()=>{
      t.style.opacity='0';
      t.style.transform='translateY(8px)';
      setTimeout(()=>t.remove(),250);
    },2400);
  }

  function smoothScrollTo(target){
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const headerOffset = 80;
    const rect = el.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - headerOffset;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }

  const watchVideoBtn = document.getElementById('watchVideoBtn');
  if (watchVideoBtn){
    watchVideoBtn.addEventListener('click', function(e){
      e.preventDefault();
      const videoSection = document.getElementById('videoSection');
      if (videoSection){
        videoSection.hidden = false;
        smoothScrollTo(videoSection);
      }
    });
  }

  const plansTopBtn = document.getElementById('plansTopBtn');
  if (plansTopBtn){
    plansTopBtn.addEventListener('click', function(e){
      e.preventDefault();
      const plansSection = document.getElementById('plansSection');
      if (plansSection){
        smoothScrollTo(plansSection);
      }
    });
  }

})();
//机构或部门（三级）
var institutions = [
  { code: '01', name: '教学机构' },
  { code: '02', name: '管理部门' },
  { code: '03', name: '教辅部门' },
  { code: '04', name: '附属机构' },
  { code: '05', name: '专职科研机构' }
];
  
//机构或部门附属（四级）
var departments = [
  //教学机构
  { pcode: '01', code: '01', name: '英东生命科学学院' },
  { pcode: '01', code: '02', name: '英东农业科学与工程学院' },
  { pcode: '01', code: '03', name: '英东食品科学与工程学院' },
  { pcode: '01', code: '04', name: '物理与机电工程学院' },
  { pcode: '01', code: '05', name: '信息科学与工程学院' },
  { pcode: '01', code: '06', name: '文学院' },
  { pcode: '01', code: '07', name: '外语学院' },
  { pcode: '01', code: '08', name: '化学与环境工程学院' },
  { pcode: '01', code: '09', name: '体育学院' },
  { pcode: '01', code: '10', name: '经济管理学院' },
  { pcode: '01', code: '11', name: '政治与公共事务管理学院' },
  { pcode: '01', code: '12', name: '法学院' },
  { pcode: '01', code: '13', name: '数学与统计学院' },
  { pcode: '01', code: '14', name: '教育学院' },
  { pcode: '01', code: '15', name: '美术与设计学院' },
  { pcode: '01', code: '16', name: '音乐学院' },
  { pcode: '01', code: '17', name: '旅游与地理学院' },
  { pcode: '01', code: '18', name: '思想政治理论课教学部' },
  { pcode: '01', code: '19', name: '韶州师范分院' },
  { pcode: '01', code: '20', name: '医学院' },
  //管理部门
  { pcode: '02', code: '01', name: '党委办、校长办'},
  { pcode: '02', code: '02', name: '纪委、监察处'},
  { pcode: '02', code: '03', name: '组织部'},
  { pcode: '02', code: '04', name: '统战部'},
  { pcode: '02', code: '05', name: '宣传部'},
  { pcode: '02', code: '06', name: '工会'},
  { pcode: '02', code: '07', name: '团委'},
  { pcode: '02', code: '08', name: '人事处、计生办'},
  { pcode: '02', code: '09', name: '教务处'},
  { pcode: '02', code: '10', name: '教学质量监控与评估中心'},
  { pcode: '02', code: '11', name: '发展规划处'},
  { pcode: '02', code: '12', name: '学生工作部（处）'},
  { pcode: '02', code: '13', name: '学生就业指导服务中心、校友会办公室'},
  { pcode: '02', code: '14', name: '科研处'},
  { pcode: '02', code: '15', name: '国际交流处'},
  { pcode: '02', code: '16', name: '成教处'},
  { pcode: '02', code: '17', name: '计划财务处'},
  { pcode: '02', code: '18', name: '资产与实验室管理处'},
  { pcode: '02', code: '19', name: '招标与投标中心'},
  { pcode: '02', code: '20', name: '武装部、保卫处'},
  { pcode: '02', code: '21', name: '审计处'},
  { pcode: '02', code: '22', name: '离退休工作处'},
  { pcode: '02', code: '23', name: '关工委'},
  { pcode: '02', code: '24', name: '后勤保障处'},
  //教辅部门
  { pcode: '03', code: '01', name: '网络与教育技术中心'},
  { pcode: '03', code: '02', name: '图书馆'},
  { pcode: '03', code: '03', name: '档案馆'},
  { pcode: '03', code: '04', name: '学报编辑部'},
  //附属机构
  { pcode: '04', code: '01', name: '校医院'},
  //专职科研机构
  { pcode: '05', code: '01', name: '英东动物疫病研究所'},
  { pcode: '05', code: '02', name: '韶文化研究院'}
];

//教职工所属（五级）
var divsion = [
  //教学机构（英东生命科学学院）组号码：01-01
  
  //教学机构（信息科学与工程学院）组号码：01-05
  { pcode: '01-05', code: '01', name: '院领导'},
  { pcode: '01-05', code: '02', name: '院办公室'},
  { pcode: '01-05', code: '03', name: '学生工作办公室'},
  { pcode: '01-05', code: '04', name: '计算机科学技术系'},
  { pcode: '01-05', code: '05', name: '通信工程系'},
  { pcode: '01-05', code: '06', name: '信息管理与信息系统系'},
  { pcode: '01-05', code: '07', name: '物联网工程系'},
  { pcode: '01-05', code: '08', name: '计算机公共教学系'},
  { pcode: '01-05', code: '09', name: '实验中心'}

];
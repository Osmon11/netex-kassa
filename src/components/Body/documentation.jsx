import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { setTab } from "store/actionCreators";
import "./style.css";

const tabs = [
  { value: "Знакомство", index: 0 },
  { value: "Начало работы", index: 1 },
  { value: "API клиенты", index: 2 },
];

export function DocumentationBody() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const d400 = useMediaQuery(theme.breakpoints.down(400));
  const currentTab = useSelector(
    (store) => store.reducer.currentDocumentationTab
  );
  const dispatch = useDispatch();

  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: 65 }}>
        <Grid item md={3} xs={12}>
          <Paper className={classes.sideBar}>
            <Typography
              variant="body1"
              style={{
                fontWeight: 400,
                marginBottom: sm ? (xs ? 20 : 40) : 60,
              }}
            >
              API справочник
            </Typography>
            <Grid container spacing={2}>
              {tabs.map((tab) => (
                <Grid item xs={d400 ? 12 : 6} sm={4} md={12}>
                  <span
                    className="nav_link"
                    style={{
                      fontSize: xs ? 16 : 20,
                      fontWeight: 400,
                      width: sm || xs ? "50%" : "",
                      color:
                        currentTab.value === tab.value ? "#FF9900" : "#fff",
                    }}
                    onClick={() => dispatch(setTab(tab))}
                    key={tab.value}
                  >
                    {tab.value}
                  </span>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={9} xs={12}>
          <Paper
            style={{ background: "#2A2B31", padding: d400 ? 20 : 32 }}
            elevation={0}
          >
            <p className="main_title">{docSteps[currentTab.index].title}</p>
            <p className="subtitle">{docSteps[currentTab.index].descrip}</p>
            {docSteps[currentTab.index].subscrip && (
              <p className="subtitle">{docSteps[currentTab.index].subscrip}</p>
            )}
            {tabsContent[currentTab.index]}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
// Tabs content array
const tabsContent = [<Acquaintance />, <BeginningOfWork />, <APIClients />];

function Acquaintance() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();

  return (
    <div className="step">
      <p style={{ marginTop: 30 }}>
        <span className="doc_link" onClick={() => dispatch(setTab(tabs[1]))}>
          Читать 'Начало работы'
        </span>
      </p>
      <p style={{ marginBottom: 30 }}>
        <span className="doc_link" onClick={() => dispatch(setTab(tabs[2]))}>
          Посмотреть API документацию
        </span>
      </p>
      <span className="title">Попробуйте сейчас</span>
      <p className="subtitle" style={{ marginTop: 0 }}>
        Попробуйте примеры ниже что бы увидеть как работает Biwse API.
      </p>
      <p className="subtitle" style={{ fontSize: xs ? 20 : 25 }}>
        Создание страницы оплаты
      </p>
      <CodeExample />
      <p className="subtitle" style={{ fontSize: xs ? 20 : 25 }}>
        Получение баланса кошелька
      </p>
      <CodeExample />
      <p className="title" style={{ marginTop: 50 }}>
        Что дальше?
      </p>
      <p>
        <span className="doc_link" onClick={() => dispatch(setTab(tabs[1]))}>
          Читать 'Начало работы'
        </span>
      </p>
    </div>
  );
}

function BeginningOfWork() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();

  return (
    <div className="step">
      <p className="title">Шаг 1: Панель управления</p>
      <p className="subtitle">
        После регистрации вашего аккаунта вы можете создать новое приложение.
        Зайдите в панель управления и создайте новое приложение (или перейдите в
        уже существующее). Затем создайте кошельки для криптовалют которые вы
        хотите принимать в вашем проекте
      </p>

      <p className="title">Шаг 2: API токен</p>
      <p className="subtitle">
        Приложения содержат кошельки криптовалют к которым вы можете получить
        доступ через API. Вы можете создавать отдельное приложение для каждого
        вашего проекта. Токены API относятся к конкретному приложению, это
        позволяет безопаснее и проще управлять разными проектами.
      </p>
      <p className="subtitle">
        Создайте новый API токен в настройках приложения.
      </p>
      <div className="flex_box" style={{ borderLeft: "10px solid #FF9900 " }}>
        <div style={{ padding: "16px 0", marginLeft: 20 }}>
          <p className="title" style={{ fontSize: xs ? 20 : 25 }}>
            Примечание
          </p>
          <p className="subtitle">
            Сохраните токен в безопасном месте, он позволяет выводить средства
            из кошельков.
          </p>
        </div>
      </div>

      <p className="title">Шаг 3: Страница оплаты</p>
      <p className="subtitle">
        Теперь с помощью API токена вы можете создать страницу оплаты: В личном
        кабинете вы можете получить токен доступа.
      </p>
      <CodeExample />
      <p className="subtitle">
        Вы можете посетить ссылку которая находится в ответе сервера и убедится
        что страница оплаты готова к работе!
      </p>
      <p className="title" style={{ marginTop: 50 }}>
        Что дальше?
      </p>
      <p>
        <span className="doc_link" onClick={() => dispatch(setTab(tabs[2]))}>
          Ознакомьтесь с API документацией
        </span>
      </p>
      <p>
        <span className="doc_link">Клиентские библиотеки API</span>
      </p>
    </div>
  );
}

function APIClients() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [tab, setTab] = useState("Node.js");

  return (
    <div className="step">
      <p className="title">Поддерживаемые библиотеки</p>
      <p className="subtitle">
        Biwse Team поддерживает несколько самых популярных библиотек, которые
        могут быть установлены с помощью менеджера пакетов:
      </p>
      <ul>
        <li className="subtitle list_item">Node.js</li>
        <li className="subtitle list_item">PHP</li>
        <li className="subtitle list_item">Go</li>
      </ul>
      <p className="title">Примеры использования</p>
      <ToggleButtonGroup
        exclusive
        value={tab}
        style={{ minWidth: xs ? "100%" : 525, margin: "33px 0" }}
        onChange={(_, tab) => setTab(tab)}
      >
        <GoldToggleButton value="Node.js">Node.js</GoldToggleButton>
        <GoldToggleButton value="PHP">PHP</GoldToggleButton>
        <GoldToggleButton value="Go">Go</GoldToggleButton>
      </ToggleButtonGroup>
      <p className="title">{tab}</p>
      <p className="subtitle">Установите пакет через npm</p>
      <CodeExample />
    </div>
  );
}

const CodeExample = () => {
  const theme = useTheme();
  const d400 = useMediaQuery(theme.breakpoints.down(400));
  return (
    <Paper
      style={{
        backgroundColor: "#18191D",
        borderRadius: 4,
        padding: d400 ? 10 : 32,
        overflowX: "auto",
      }}
      elevation={0}
    >
      <p className="blue_text">
        curl -X POST \<br />
        -H <span className="red_text">"Content-Type: application/json" </span>
        <span style={{ color: "#fff" }}>\</span>
        -H <span className="red_text">"Accept: application/json" </span>
        <span style={{ color: "#fff" }}>\</span>
        -H <span className="red_text">"Authorization: Bearer YOUR_TOKEN" </span>
        <span style={{ color: "#fff" }}>\</span>
        https://api.biwse.com/v1/app/YOUR_APP_ID/invoice -d{" "}
        <span className="red_text">'{'{ "amount": 0.0001 }'}' </span>
        <span style={{ color: "#fff" }}>\</span>
      </p>
      <p className="green_text" style={{ marginTop: 20 }}>
        # Response:
        <br />#
        {
          '{"status":true,"id":"invoice_id...","url":"https://biwse.com/invoice?id=invoice_id..."}'
        }
      </p>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  sideBar: {
    padding: "30px 50px",
    background: " linear-gradient(270deg, #2A2B31 0%, #18191D 82.47%)",
    minHeight: 624,
    [theme.breakpoints.down("sm")]: {
      minHeight: 165,
    },
    [theme.breakpoints.down(400)]: {
      padding: "30px 40px",
    },
  },
}));

const docSteps = [
  {
    title: "Знакомство с платформой",
    descrip:
      "Biwse предоставляет сервис криптовалютных кошельков, которыми вы можете управлять через удобный веб-интерфейс или с помощью мощного API. Наша платформа позволяет принимать и отправлять криптовалюту, создавать страницы оплаты товара на которых можно совершить платеж с помощью любых доступных валют.",
    subscrip:
      "Документация содержит полезные статьи и ресурсы для того что бы начать работать с Biwse. Перейдите к статье 'Начало работы' или обратитесь сразу к API документации.",
  },
  {
    title: "Начало работы",
    descrip:
      "Дружественная к разработчикам платформа Biwse позволяет с легкостью создавать удивительные приложения или интегрировать Biwse API в существующий проект. В этой статье вы пройдете от регистрации до рабочего решения меньше чем за 5 минут.",
  },
  {
    title: "API Клиенты",
    descrip:
      "Biwse API построен на основе спецификации OpenAPI 3.0, поэтому вы можете сгенерировать клиентскую библиотеку API для большинства популярных языков.",
  },
];

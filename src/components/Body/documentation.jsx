import {
  Container,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "store/actionCreators";
import pdfIcon from "assets/pdfFile.svg";
import apiIcon from "assets/api.svg";
import apiActiveIcon from "assets/api-active.svg";
import sciIcon from "assets/sci.svg";
import sciActiveIcon from "assets/sci-active.svg";
import "./style.css";
import { GoldButton } from "shared/Buttons/buttons";
import { Auth } from "components/Auth/auth";
import { useHistory } from "react-router-dom";

const tabs = [
  { value: "Знакомство", index: 0 },
  { value: "Начало работы", index: 1 },
  { value: "API клиенты", index: 2 },
];

export function DocumentationBody() {
  const theme = useTheme();
  const d400 = useMediaQuery(theme.breakpoints.down(400));

  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: 65 }}>
        <Grid item xs={12}>
          <Paper
            style={{ background: "#2A2B31", padding: d400 ? 20 : 32 }}
            elevation={0}
          >
            <p className='main_title'>{docSteps[2].title}</p>
            <p
              className='subtitle'
              style={{
                textAlign: "center",
                paddingBottom: 60,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Netex Kassa API построен на основе спецификации OpenAPI 3.0,
              поэтому вы можете сгенерировать клиентскую библиотеку API для
              большинства популярных языков.
            </p>
            {tabsContent[2]}
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
    <div className='step'>
      <p style={{ marginTop: 30 }}>
        <span className='doc_link' onClick={() => dispatch(setTab(tabs[1]))}>
          Читать 'Начало работы'
        </span>
      </p>
      <p style={{ marginBottom: 30 }}>
        <span className='doc_link' onClick={() => dispatch(setTab(tabs[2]))}>
          Посмотреть API документацию
        </span>
      </p>
      <span className='title'>Попробуйте сейчас</span>
      <p className='subtitle' style={{ marginTop: 0 }}>
        Попробуйте примеры ниже что бы увидеть как работает Netex Kassa API.
      </p>
      <p className='subtitle' style={{ fontSize: xs ? 20 : 25 }}>
        Создание страницы оплаты
      </p>
      <CodeExample
        link={`https://api.netex-kassa.com/v1.0/app/{MERCHANT_ID}/invoice`}
        postRequest
      />
      <p className='subtitle' style={{ fontSize: xs ? 20 : 25 }}>
        Получение баланса кошелька
      </p>
      <CodeExample
        link={`https://api.netex-kassa.com/v1.0/app/{MERCHANT_ID}/balance`}
      />
      <p className='title' style={{ marginTop: 50 }}>
        Что дальше?
      </p>
      <p>
        <span className='doc_link' onClick={() => dispatch(setTab(tabs[1]))}>
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
    <div className='step'>
      <p className='title'>Шаг 1: Панель управления</p>
      <p className='subtitle'>
        После регистрации вашего аккаунта вы можете создать новое приложение.
        Зайдите в панель управления и создайте новое приложение (или перейдите в
        уже существующее). Затем создайте кошельки для криптовалют которые вы
        хотите принимать в вашем проекте
      </p>

      <p className='title'>Шаг 2: API токен</p>
      <p className='subtitle'>
        Приложения содержат кошельки криптовалют к которым вы можете получить
        доступ через API. Вы можете создавать отдельное приложение для каждого
        вашего проекта. Токены API относятся к конкретному приложению, это
        позволяет безопаснее и проще управлять разными проектами.
      </p>
      <p className='subtitle'>
        Создайте новый API токен в настройках приложения.
      </p>
      <div className='flex_box' style={{ borderLeft: "10px solid #FF9900 " }}>
        <div style={{ padding: "16px 0", marginLeft: 20 }}>
          <p className='title' style={{ fontSize: xs ? 20 : 25 }}>
            Примечание
          </p>
          <p className='subtitle'>
            Сохраните токен в безопасном месте, он позволяет выводить средства
            из кошельков.
          </p>
        </div>
      </div>

      <p className='title'>Шаг 3: Страница оплаты</p>
      <p className='subtitle'>
        Теперь с помощью API токена вы можете создать страницу оплаты: В личном
        кабинете вы можете получить токен доступа.
      </p>
      <CodeExample noContent />
      <p className='subtitle'>
        Вы можете посетить ссылку которая находится в ответе сервера и убедится
        что страница оплаты готова к работе!
      </p>
      <p className='title' style={{ marginTop: 50 }}>
        Что дальше?
      </p>
      <p>
        <span className='doc_link' onClick={() => dispatch(setTab(tabs[2]))}>
          Ознакомьтесь с API документацией
        </span>
      </p>
      <p>
        <span className='doc_link'>Клиентские библиотеки API</span>
      </p>
    </div>
  );
}

function APIClients() {
  const theme = useTheme();
  const d400 = useMediaQuery(theme.breakpoints.down(400));
  const state = useSelector((store) => store.reducer);
  const history = useHistory();
  const [tab, setTab] = useState("API");
  const [dialog, setDialog] = useState({ open: false, login: true });

  return (
    <div className='step'>
      <div className='flex_box'>
        <div
          className='api_tab'
          style={{
            borderColor: tab === "API" ? "#ff9900" : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => setTab("API")}
        >
          <p
            className='main_title'
            style={{
              fontWeight: 400,
              fontSize: "35px",
              marginTop: "75px",
              marginBottom: "23px",
            }}
          >
            API
          </p>
          <p className='subtitle doc_tab'>
            Merchant API поможет вам с легкостью организовать взаимодействие
            любого приложения с платежной системой Netex Kassa, автоматизировать
            отправку и получение платежей, просмотр истории, поиск транзакций и
            многое другое. Готовые библиотеки для быстрой интеграции:{" "}
            <span style={{ color: "#ff9900" }}>Java, Ruby, PHP</span>
          </p>
          <div
            className='tab_icon'
            style={{
              borderColor:
                tab === "API" ? "#ff9900" : "rgba(255, 255, 255, 0.8)",
            }}
          >
            <img src={tab === "API" ? apiActiveIcon : apiIcon} alt='' />
          </div>
        </div>
        <div
          className='sci_tab'
          style={{
            borderColor: tab === "SCI" ? "#ff9900" : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => setTab("SCI")}
        >
          <p
            className='main_title'
            style={{
              fontWeight: 400,
              fontSize: "35px",
              marginTop: "75px",
              marginBottom: "23px",
            }}
          >
            SCI
          </p>
          <p className='subtitle doc_tab'>
            Shopping Cart Interface — функционал, позволяющий вам как продавцу
            осуществлять приём платежей на вашем сайте от ваших заказчиков.
            Благодаря активированному SCI вы сможете в течение нескольких минут
            подключить ваш интернет-магазин или веб-проект к Netex Kassa и
            начать принимать платежи от клиентов системы и не только.
          </p>
          <div
            className='tab_icon'
            style={{ borderColor: tab === "SCI" ? "#ff9900" : "#fff" }}
          >
            <img src={tab === "SCI" ? sciActiveIcon : sciIcon} alt='' />
          </div>
        </div>
      </div>
      <div className='flex_box' style={{ margin: "40px 0px" }}>
        <div style={{ width: "50%", marginRight: 15 }}>
          <ul className='documentation_list'>
            <li>Включение и настройка в несколько кликов</li>
            <li>Гибкий выбор поддерживаемых операций</li>
            <li>Выбор валют и лимитов по производимым операциям</li>
          </ul>
        </div>
        <div style={{ width: "50%", marginLeft: 15 }}>
          <ul className='documentation_list'>
            <li>Самый простой способ приема платежей на Вашем сайте</li>
            <li>Автоматическая конвертация перевода при необходимости</li>
            <li>Ограничение доступа по IP адресу</li>
          </ul>
        </div>
      </div>
      <Paper
        style={{
          backgroundColor: "#18191D",
          borderRadius: 4,
          padding: d400 ? 10 : 32,
          textAlign: "center",
        }}
        elevation={0}
      >
        <div className='flex_box'>
          <img src={pdfIcon} alt='' />
          <span style={{ textAlign: "left", marginLeft: 40 }}>
            <a
              href={
                tab === "API"
                  ? "https://docs.netex-kassa.com"
                  : "https://api.netex-kassa.com/public/docs/netex-kassa-sci.pdf"
              }
              style={{ color: "#ff9900" }}
            >
              <span
                className='project_link'
                style={{ textDecoration: "underline" }}
              >
                Инструкция по{" "}
                {tab === "API" ? "Merchant API" : "Shopping Cart Interface"},
                Версия 1.0
              </span>
            </a>
            <p className='subtitle'>
              Этот документ описывает, как программно
              <br /> взаимодействовать с системой Netex Kassa.
            </p>
          </span>
        </div>
      </Paper>
      <GoldButton
        onClick={() => {
          if (state.user) {
            history.push("/dashboard");
            return;
          }
          setDialog({ open: true, login: false });
        }}
        style={{
          ...btnStyles,
        }}
      >
        Стать клиентом
      </GoldButton>
      <Auth
        open={dialog.open}
        login={dialog.login}
        setLogin={(login) => setDialog({ open: true, login })}
        handleClose={() => {
          setDialog({ ...dialog, open: false });
        }}
      />
    </div>
  );
}

const CodeExample = ({ noContent, postRequest = false, link }) => {
  const theme = useTheme();
  const d400 = useMediaQuery(theme.breakpoints.down(400));

  return (
    <Paper
      style={{
        backgroundColor: "#18191D",
        borderRadius: 4,
        padding: d400 ? 10 : 32,
        overflowX: "auto",
        height: "290px",
      }}
      elevation={0}
    >
      {!noContent && (
        <p className='blue_text'>
          curl -X POST \<br />
          -H <span className='red_text'>"Content-Type: application/json" </span>
          <span style={{ color: "#fff" }}>
            \<br />
          </span>
          -H <span className='red_text'>"Accept: application/json" </span>
          <span style={{ color: "#fff" }}>
            \<br />
          </span>
          -H{" "}
          <span className='red_text'>"Authorization: Bearer YOUR_TOKEN" </span>
          <span style={{ color: "#fff" }}>
            \<br />
          </span>
          {link} -d
          <br />
          {postRequest && (
            <>
              <span className='red_text'>
                '
                {
                  '{ "amount": 0.0001, "symbol": "USD-BTC", "order_id": "123", "sign": ... }'
                }
                '{" "}
              </span>
              <span style={{ color: "#fff" }}>\</span>
            </>
          )}
        </p>
      )}
      {/* <p className='green_text' style={{ marginTop: 20 }}>
        # Response:
        <br />#
        {
          '{"status":true,"id":"invoice_id...","url":"https://netex-kassa.com/invoice?id=invoice_id..."}'
        }
      </p> */}
    </Paper>
  );
};

const btnStyles = {
  minHeight: 50,
  marginTop: 40,
  minWidth: 195,
  marginLeft: "50%",
  fontSize: 16,
  transform: "translateX(-50%)",
};

const docSteps = [
  {
    title: "Знакомство с платформой",
    descrip:
      "Netex Kassa предоставляет сервис криптовалютных кошельков, которыми вы можете управлять через удобный веб-интерфейс или с помощью мощного API. Наша платформа позволяет принимать и отправлять криптовалюту, создавать страницы оплаты товара на которых можно совершить платеж с помощью любых доступных валют.",
    subscrip:
      "Документация содержит полезные статьи и ресурсы для того что бы начать работать с Netex Kassa. Перейдите к статье 'Начало работы' или обратитесь сразу к API документации.",
  },
  {
    title: "Начало работы",
    descrip:
      "Дружественная к разработчикам платформа Netex Kassa позволяет с легкостью создавать удивительные приложения или интегрировать Netex Kassa API в существующий проект. В этой статье вы пройдете от регистрации до рабочего решения меньше чем за 5 минут.",
  },
  {
    title: "Разработчикам",
    descrip:
      "Netex Kassa API построен на основе спецификации OpenAPI 3.0, поэтому вы можете сгенерировать клиентскую библиотеку API для большинства популярных языков.",
  },
];

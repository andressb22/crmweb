import { useEffect, useState } from "react";
import CollapsibleItem from "./CollapsibleItem";
import { useParams, Link } from "react-router";
import { URLAPI, URLLOCAL } from "../../const";
import styles from "../pages/styles/ImageViewer.module.css";

type Obi_objetosinventario = {
  obi_id: string;
  obj: {
    obj_name: string;
  };
};

type Ami_ambientesInmueble = {
  ami_id: string;
  amb: {
    amb_name: string;
  };
  Obi_objetosinventario: Obi_objetosinventario[];
};

type menuType = {
  inm_id: string;
  Ami_ambientesInmueble: Ami_ambientesInmueble[];
};

const Menu = () => {
  const [menu, setMenu] = useState<menuType>({
    inm_id: "",
    Ami_ambientesInmueble: [],
  });
  const { inm_id } = useParams();

  useEffect(() => {
    const getMediaProperty = async () => {
      try {
        const data = await fetch(`${URLAPI}getMultimediaProperty/${inm_id}`);
        if (!data.ok) throw new Error("error");

        const res = await data.json();
        setMenu(res);
      } catch (error) {
        console.log(error);
      }
    };

    getMediaProperty();
  }, []);

  return (
    <div className={styles.menu}>
      <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
        <CollapsibleItem label="Inmueble">
          <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
            <li className={styles.itemlist}>
              <Link
                className={styles.link}
                to={`${URLLOCAL}imageviewer/${menu.inm_id}/${menu.inm_id}`}
              >
                Fotos de fachada
              </Link>
            </li>
            {menu.Ami_ambientesInmueble.map((zone) => (
              <CollapsibleItem
                key={zone.ami_id}
                label={`${zone.amb.amb_name} (${zone.ami_id.substring(0, 6)})`}
              >
                <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                  <li className={styles.itemlist}>
                    <Link
                      className={styles.link}
                      to={`${URLLOCAL}imageviewer/${menu.inm_id}/${zone.ami_id}`}
                    >
                      Fotos de la zona
                    </Link>
                  </li>
                  {zone.Obi_objetosinventario.map((object) => (
                    <li className={styles.itemlist} key={object.obi_id}>
                      <Link
                        className={styles.link}
                        to={`${URLLOCAL}imageviewer/${menu.inm_id}/${object.obi_id}`}
                      >
                        {object.obj.obj_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleItem>
            ))}
          </ul>
        </CollapsibleItem>
      </ul>
    </div>
  );
};

export default Menu;

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddOrEdit`(
IN _id INT,
IN _nombre VARCHAR(50),
IN _edad INT,
IN _es_adulto INT,
IN _contraseña VARCHAR(100),
IN _email VARCHAR(100)

)
BEGIN
		IF _id = 0 THEN 
			INSERT INTO usuarios (nombre, edad, es_adulto, contraseña, email) 
			VALUES (_nombre, _edad, _es_adulto, _contraseña, _email);
			SET _id = LAST_INSERT_ID();
		ELSE
			UPDATE usuarios
			SET
			nombre = _nombre,
			edad = _edad,
			es_adulto = _es_adulto,
			contraseña = _contraseña,
			email = _email
			WHERE id = _id;
		END IF;
        
        SELECT _id AS id;
END


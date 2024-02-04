CREATE DEFINER=`root`@`localhost` PROCEDURE `bank_AddOrEdit`(
IN _id INT,
IN _idUser INT,
IN _balance DECIMAL

)
BEGIN
		IF _id = 0 THEN 
			INSERT INTO cuentas_bancarias (id_usuario, saldo) 
			VALUES (_idUser, _balance);
			SET _id = LAST_INSERT_ID();
		ELSE
			UPDATE cuentas_bancarias
			SET
			id_usuario = _idUser,
			saldo = _balance
			WHERE id = _id;
		END IF;
        
        SELECT _id AS id;
END
CREATE TABLE `commissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`client_name` varchar(255) NOT NULL,
	`project_type` enum('Illustration','Live2D Rigging','Separation','Other') NOT NULL,
	`price` int NOT NULL,
	`deadline` timestamp NOT NULL,
	`status` enum('Pending','InProcess','Completed','Cancelled') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `commissions_id` PRIMARY KEY(`id`)
);

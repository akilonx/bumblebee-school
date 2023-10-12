import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Student } from "../student";

export class StudentCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public student: Student;

  constructor(member: Student) {
    this.dateTimeOccurred = new Date();
    this.student = member;
  }

  getAggregateId(): UniqueEntityID {
    return this.student.id;
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IPeople } from 'src/app/models/ipeople';
import { PeopleService } from 'src/app/services/people.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit{
      displayedColumns = ['nome','cpf', 'telefone','acoes']
      peoples : IPeople[] = [];
      dataSource: MatTableDataSource<IPeople>;

      @ViewChild(MatPaginator) paginator! : MatPaginator;
      @ViewChild(MatSort) sort! : MatSort;

      constructor(private peopleService:PeopleService){
        this.getter();
        this.dataSource = new MatTableDataSource(this.peoples);
        console.log("Data Source: ", this.dataSource);
      }
      
      ngAfterViewInit(){
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort;
      }
      getter() {
        this.peopleService.getAll().subscribe(
          (data: IPeople[]) => {
          this.peoples = data.filter(x => x.isActive);
          console.log("People: ", this.peoples);
          }
          );
      }

      remove(id:number){
        this.peopleService.remove(this.peoples[id].personId).subscribe();
        console.log(this.peoples[id].personId);
        this.getter();
      }

      applyFilter(event:Event){
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
}
